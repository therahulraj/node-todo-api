const {
  ObjectID
} = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');

const {
  mongoose
} = require('./db/mongoose');
const {
  Todo
} = require('./models/todo');
const {
  User
} = require('./models/users');
const _ = require('lodash');
//server.js is only responsible for our routs.
//this refactoring makes it lot more easier for test, update, and manage.

var port = process.env.PORT || 3000;
var app = express();


app.use(bodyParser.json()); //this takes a middleware we can use some custom middleware some functions also we can use built-in middleware that we usually access of the library.
//this returns a function and that is a function that we need to give to express.

// app.get('/todos/:id', (req, res) => {
//   Todo.find().then((todos) => {
//     // res.send({todos});
//     //res.send() we can pass todos like this but it will give back
//     //array and that is kind of locking of ourself.
//     //so if you want to add custom property you can't there is
//     //a better solution is to seting it equal to the Todos
//     //array using es6
//     //and now we can also use custom status codes
//     //with not using array we are using a flexible option
//   res.send(req.params);
// //that means we are able to access the value here using req.params.id
//   }, (err) => {
//     res.status(400).send(err);
//   })
// })


app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.status(200).send({todos});
  }, (err) => {
    res.status(400).send();
  })
})


app.get('/todos/:id', (req, res) => {

  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
  return res.status(404).send({});
  }
  Todo.findById(id).then((todo) => {
    if(!todo) {
     return res.status(404).send();
    }
    res.send({todo});
  }, (err) => {
    res.status(400).send(err);
  })
})





app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  })
});



app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']); //it will be added to body variable if only if it is being provided by the user.
  //if it is not provided then the validation will fail.
  //we will never allow user to manipulate token directly.
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();  //we are expecting a chaining promise.
    //res.status(200).send(user);
  }).then((token) => {
    res.header('x-auth', token).send(user);  //the arguments are key value pairs. the key is the header name and teh value is the value you wanna set.
    //when you prefix a header with x hyphen you're creating a custom header which means it's not necessarily a header that http support by default. it's a header you're using for specific purposes.
    //in our case we are creating header to store jwt scheme token scheme so we're creating a custom header to store that value.
    //we have to add on that header we have to send the token back as an http response header which is the real goal here.
  }).catch((e) => {
    res.status(400).send(e);
  })
})

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findByIdAndRemove(id).then((doc) => {
    if(!todo) {
      return res.status(404).send()
    }
    res.status(200).send(doc);
  }).catch((e) => {
    res.status(400).send(e);
  })
})


app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);
  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime(); //here we created a newe completedAt property at body.
  } else {
    body.completed = false;
    body.completedAt = null; //if you want to remove a value from the database you can simply set it to null.
    }
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {  //this is just similar in what we saw in native driver.
      if(!todo) {                           //this will show the updated document.
        return res.status(404).send();
      }
      res.send({todo})
    }).catch((e) => {
      res.status(400).send();
    })
})

//a private route
//this route requires validation this means this requires x auth token
//it's gonna find that user and send that user back.
app.get('/users/me')


app.listen(port, () => {
  console.log('Started on port 3000');
})





// and that is how to fetch a variable that's passed in via the url.----------------
// this means that we gonna have to make a part of the url dynamic.
// we need url parameter. url parameter follow this pattern. it's a colon follow by a name.
// //we could do this via
// app.get('/todos/:id', (req, res) => {
// req.params  //here it's going to be an object it's going to have key value pairs
//where the key is the url parameter and the value is whatever value was actually put here.
// })
// //this is going to create id variable. it's goingto be on request object. and we'll be able to access that variable.
