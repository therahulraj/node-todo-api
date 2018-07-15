const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/todoApp', (err, db) => {
  if(err) {
    return console.log('unable to connect to the database');
  }
  console.log('succesfully connected to the mongoDB server.');
  // db.collection('Todos').find({
  //   _id: new ObjectID('5b49aaa405da094f98ece9fc')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('unable to fetch data', err);
  // }); //instead of having cursor we are having cursor we are having
  //by using db.collection we can access the collect file.
  //here we are not providing a query so we are not saying we want to fetch
  //all todo's that are completed.
  //find returns a mongoDB cursor this cursor is not actual document itself.
  //that could be thousand and that wold be really inefficient it's actally
  // a pointer to those documents.
  //and these documents has ton of methods we can use thos mehtiods to get
  //our method to get our documents.
  //instead of having cursor we have array of documents it means we have array of objects.
  //toArray returns a promise.
  //so we have our first query ready to the database

  //we are going to pass in one argumens instead of zero this is what's known as our query inside of here,
  //inside of here we can specify how we want to query the todos collection.

  //from the todos we can query the documents whose collection value is set to false.

  //what we have inside the _id property is not a string but a object id means that we need to use this objectID
  //constructor function.
  db.collection('Todos').find().count().then((docs) => { //this will count all the todos
    console.log(`number of todos ${docs}`);//we can also use callback function but we are using proises.
  }, (err) => {
    console.log('unable to count the data', err);
  })
})
