const mongoose = require('mongoose');
mongoose.Promise = global.Promise; //the promise is allready added to the language
//so we can set to the global promise.
mongoose.connect('mongodb://localhost:27017/todoApp');

//we have mongoose configuration in different file
//if some file gets this file then first this will configure the connection then it will export the variable.
module.exports = {
  mongoose
};
