//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); //this is object destructing, this is identical to the provious statement
//now we have object destructing in place we can pull off other things.
//this ObjectID constructor function let us to make new objectids on fly.
var obj = new ObjectID();
console.log(obj);
//here todoApp is a database and in this database there is collection called todos collection where a record lives.
MongoClient.connect('mongodb://localhost:27017/todoApp', (err, db) => {  //the err argument will exist if there is one if it is not avoilable
  //we can use db object to issue commands of writting and reading data.
  //now you must have noticed that we have changed the name of the database
  //name and we never did anything to create it.
  //unlike other database you don't need to create databeses before you start using it.
  //mongo is not gonna is not a gonna create a database until we start adding data into it.

  if (err) {
    return console.log('Unable to connect to the mongoDB server');
  }

  console.log('succesfully connected to the server.');

  db.collection('Todos').insertOne({
    //_id: 1234,//but you can do anything you like for Id creation over inside of robo MOngo
    text: 'something to do',
    completed: false
  }, (err, result) => {
    if (err) {
      return console.log('unable to insert to do', err);
    }
    console.log(result.ops[0]._id.getTimestamp()); //here we get the time when the document was created.
    //the ops attribute is going to store all the docs that were inserted in this case it is only one.
    //it is the array of all the documents or records in that collection.
  })
  //it's gonna take the first argument as name of the collection so we don't have to
  //make the collection
  //the insertone() will insert a new document into the colletion

db.collection('Users').insertOne({
  name: 'Rahul Raj',
  age: 20,
  place: 'Bhopal'
}, (err, result) => {
  if(err) {
    return console.log('unable to insert to do', err);
  }
  console.log(result.ops);
})

  db.close();

})

//the first argument is basically the url where our database lives in amazon web services or a huroeku url
//in our case it is the local database.
//the second argument is the callback function that will fire either our connection succeded or failed.
//when we connect to a mongodb database we have to use mongodb protocol

//we can also use mongodb://localhost:27017/test //this test is given by default mongodb gives you but you can
//go ahead and create a new one for oneself.
