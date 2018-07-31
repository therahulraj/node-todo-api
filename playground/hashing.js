//here we are going to grab one of the property
const {SHA256} = require('crypto-js'); //and now we have access to our hashing function.
//256 comes from the number of bits that are resulting hash.
//to hash a value all we have to do is pass it into the sha256 function.

const jwt = require('jsonwebtoken');

var message = 'I am user number 3';

var hash = SHA256(message).toString(); //this will return string so we have to convert back to string.

console.log(`message ${message}`);
console.log(`hash ${hash}`);


//let's talk about the data we want to send back from the server to the client.
var data = {
  id: 4
}
// the id property is going ot equal the user's id inside of the user's collection
// this is going to let us know which user should be able to make that request.

//if i'm trying to delete a todo with an id of 3 but the user who created that doesn't match the id of that token then i should know that they shouln't
//able to delete that because it's not their data.

var token = {
  data,
  hash: SHA256(JSON.stringify(data)  + "somesecret").toString() //the hash property is going to be hashed value of the data.
  //so when the data changes later on and we refresh it we're not going to get the same value back so we'll be tell that the data was manipulated.
}

//salting the hash means that you add something on the hash that is unique that changes the value of the hashed value.
//and as long i use a different salt every time i'm never going to get the same hash twice.


// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();


var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
if(resultHash === token.hash) {
  console.log('Data was not changed');
} else {
  console.log('Data was changed. Do not trust!');
}
//in our this is the token we pass back and forth.

//now this whole concept that we just went over the idea of creating an object hashing it and verifying it later, this is not something new there
//is actually a whole standard called json web token,
//we could write this all code and handle this all edge cases by our own but there is no reason for doing that.



//json web tokens-------------

//essentially we get the two functions one to create the token and other to verify.

//json.sign() //as u might expect it takes the object in this case that data with the user id and signs it, it creates the hash and returns the token.

var data = {
  id: 10
}
var token = jwt.sign(data, '123abc');
//and this is the token we will be sending back to user whenever they sign up or log in.
//it's also the value that we are going to store inside of that tokens array.
console.log(token);

//jwt.io

var decoded = jwt.verify(token, '123abc');
