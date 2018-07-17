
var mongoose = require('mongoose');

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
