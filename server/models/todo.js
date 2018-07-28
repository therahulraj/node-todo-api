
var mongoose = require('mongoose');
//this file is the plain old module not ehe we have created as it is not needed.

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

module.exports = {Todo};
