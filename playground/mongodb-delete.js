const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/todoApp', (err, db) => {
  if(err) {
    return console.log('unable to connect to the database');
  }
  console.log('succesfully connected to the mongoDB server.');
//deleteMany
// db.collection('Users').deleteMany({name: "Rahul Raj"}).then((result) => {
//   console.log(result);//this will give the result  back that how many documents are deleted or that process is successful or not.
//   })





//deleteOne
// db.collection('Users').deleteOne({name: "Amrita"}).then((result) => {
//  console.log(result);//this method will delete only the first document that passes the criteria.
//  })




//findOneAndDelete
// db.collection('Users').findOneAndDelete({name: "aman"}).then((result) => {
//   console.log(result);//this method will delete the first docment which satisfies the query and return
//   //that document back.
// })




db.collection('Users').find({name: "Rahul Raj"}).toArray().then((docs) => {
  if(docs.length > 1) {
    db.collection('Users').deleteMany({name: "Rahul Raj"}).then((result) => {
      console.log(result);
    }, (err) => {
      console.log('unable to delete.', err);
    })
  }
  else {
    console.log('there is no duplication for Rahul Raj.');
  }
}, (err) => {
  console.log('unable to find', err);
})
})
