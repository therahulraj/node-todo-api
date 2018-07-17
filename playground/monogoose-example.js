//this is our root of our project
//we need to run this file at first
//this will get everything to go.


const mongoose = require('mongoose');
mongoose.Promise = global.Promise; //the promise is allready added to the language
//so we can set to the global promise.
mongoose.connect('mongodb://localhost:27017/todoApp');



// mongoose is maintaining this connection over time.
//save something
//now obviously by the time this statement runs mongoose connect is not going to have had to make a database
 //request to connect, that's going to take a few millisecond atleast
 //mongoose is going to be waiting for that connection before it ever actually tries to make any of the query.
 //we don't have to micromanage the order things happen in mongoose thake care of that for us.

 //mongoose support callbacks by default but promises are that i prefer they are lot more
 //simpler to chain, manage and scale.


//the next thing we're going to do is create a model.
//so mongoose knows how to store data and define certain things
var Todo = mongoose.model('Todo', {
 text: {
   type: String,   //these are validators.
   required: true,
   minlength: 1,
   trim: true
 },
 completed: {
   type: Boolean,
   default: false
 },
 completedAt: {
   type: Number,
   default: null
 }  //now we have a very good schema set up for our model
});
  //this property is going to define the various properties.

//model is a structure for storing data in the mongodb.


 var newTodo = new Todo({
   text: 'cook dinner'
 });  //run it as constructor function that is returned as
 //mongoose.model()


//creating alone the instance does not actually update the mongo db database
newTodo.save().then((doc) => {
  console.log('saved todo', doc);
  //the __v keeps track of the model.
}, (err) => {
  console.log('unable to save todo', err);
});//the error can occur if the model failed or connection failed.

// var otherTodo = new Todo({
//   text: 'TnT',
//   completed: false,
//   completedAt: 123
// });
//
// otherTodo.save().then((doc) => {
//   console.log('other todo is saved', doc);
// }, (err) => {
//   console.log('unable to save todo', err);
// })
