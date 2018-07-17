var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {users} = require('./models/users');

//server.js is only responsible for our routs.
//this refactoring makes it lot more easier for test, update, and manage.


var app = express();


app.use(bodyParser.json());  //this takes a middleware we can use some custom middleware some functions also we can use built-in middleware that we usually access of the library.
//this returns a function and that is a function that we need to give to express.


app.post('/todos', (req, res) => { //the url for the rest API is really
  //important and there is lot to talk about the proper structure.
  //body parser is going to take your JSON and convert it into an object attaching
  //it onto this req object.
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  })
});
app.listen(3000, () => {
  console.log('Started on port 3000');
})
