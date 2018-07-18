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

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
    //res.send() we can pass todos like this but it will give back
    //array and that is kind of locking of ourself.
    //so if you want to add custom property you can't there is
    //a better solution is to seting it equal to the Todos
    //array using es6
    //and now we can also use custom status codes
    //with not using array we are using a flexible option


  }, (err) => {
    res.status(400).send(err);
  })
})


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
