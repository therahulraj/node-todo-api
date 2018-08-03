const  mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      trim: true, //it will trim the whitespaces in the left or right most part.
      minlength: 1,
      unique: true,  //it will check that the email value is not same as any othter document in the collection.
      //it would pass if it is set to the false that is the default value.
      validate: {
        //call that third party module and call the function inside of our validator.
        validator: validator.isEmail, //it will return false if it is not an valid email or it will return false if it is a invalid email.
        //validator.isEmail,
        message: `is not a valid email.`
      }
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },

    //now tokens are array, this feature is available only in mongo db but not in the SQl databases.
    //this nested document is going to be how we access the tokens for individual users in order to set up the schema to support we're going
    //to set tokens to an array.
    tokens: [{
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }]
})
//the schema property lets you to define a new schema and this is what we need in order to tack on these custom methods.
//we can't add methods on to
//user we have to switch how we're generating the model.

//this method which we're going to define as a regular function determines what exactly is sent back,
//when a mongoose model is converted is converted
//into a json value.
UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject(); //this is going to take the mongoose object and convert it into regular object that is keeping the properties that
  //only exists in document/
  return _.pick(userObject, ['email', '_id']);
}


UserSchema.methods.generateAuthToken = function () {
  var user = this; //this user stores the individual document.
  //we need to get an access value and a token value in order to create the new token inside of the document.
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
  //now all our data is generated and all we need to do is update the user tokens array.

  user.tokens = user.tokens.concat([{access, token}]);
  //now we have updated our local user model but we haven't saved it yet.

  return user.save().then(() => {
    return token;
  })//the returned token will be used as success method in the server.js file.
  //in this case we're just returning a value.
}
//this is an object an on this method we can add any method we can.
//these are going to be your instance methods.
//now the instance methods does have access to the individual document
//which is great beacause we need that information in order to create jsonwebtoken


UserSchema.statics.findByToken = function (token) {
  //going through the process of verifying it finding the associated user and returning it.
  var User = this; //the model method get called with
  var decoded; //is going to store the decoded jwt values.

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
   // return new Promise((resolve, reject) => {
   //   reject();
   // })
   return Promise.reject();
  }

  return User.findOne({  //here we are returning a promise.
    _id: decoded._id,  //here we have to query our nested object properties inside of the tokens, so to do that we have to write it in string as shown below.
    'tokens.token': token,
    'tokens.access': 'auth'
  })
}
//.statics specify everything you add on to it turns it into model method.

UserSchema.statics.findByCredentials = function (email, password) {
  var User = this;

  return User.findOne({email}).then((user) => {
    if(!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {  //the default way of working with bcryt is callbacks but we use here use promise everywhere to handle
      //asynchronous code.
      bcrypt.compare(password, user.password, (err, res) => {
        if(res) {
          resolve(user);
        }
        else {
          reject();
        }
      })
    })
  })
};



UserSchema.pre('save', function (next) { //this is a middlware that is going to run before saving the document.
  //thats why we used save.
  //we have to call next otherwise oure programme will never go and it will crash.
  //and this function have the access to the individual document.
  var user = this;
  if(user.isModified('password'))    //this is going to check if the password was just modified
  //otherewise this will run when the other things like email will update and it will again hash
  //the allready hashed value and that will break the programme.
  {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      })
    })
  } else {
   next();
  }
})

UserSchema.methods.removeToken(token) = function (token) {
  var user = this;
  return user.update({
    $pull: { //and we can define what we gonna pull from
      tokens: {
        token //this will not remove only the token property but that entire object containing the access property.
      }

    }
  })
  //this is a mongo db operator pull lets you to remove items from an array that match certain criteria.
}


var User = mongoose.model( 'user', UserSchema);
//at this we have made zero changes to the functionality of our application

module.exports = {User};
