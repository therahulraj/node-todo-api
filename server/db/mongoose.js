const mongoose = require('mongoose');
mongoose.Promise = global.Promise; //the promise is allready added to the language
//so we can set to the global promise.
mongoose.connect('mongodb://localhost:27017/todoApp');

//we have mongoose configuration in different file
//we gonna configure mongoose and export for further use in outher files.
module.exports = {
  mongoose
}
