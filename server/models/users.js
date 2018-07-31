const  mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

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
//the schema property lets you to define a new schema and this is what we need in order to tack on these custom methods. we can't add methods on to
//user we have to switch how we're generating the model.

//this method which we're going to define as a regular function determines what exactly is sent back, when a mongoose model is converted is converted
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
//now the instance methods does have access to the individual document which is great beacause we need that information in order to create jsonwebtoken
var User = mongoose.model( 'user', UserSchema);
//at this we have made zero changes to the functionality of our application

module.exports = {User};
