const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/todoApp', (err, db) => {
  if(err) {
    return console.log('unable to connect to the database');
  }
  console.log('succesfully connected to the mongoDB server.');
db.collection('Users').findOneAndUpdate({
  _id: new ObjectID('5b4b0536ca01f13d5053825d')  //this is filter object which will filter out the required records
}, {
  $inc: { //this set is a update operator so that we have to do this in order to set some feild on the document.
    age: -1
  }
}, {
  returnOriginal: false      //this is by default true we hvae to set it to false to get the updated document back
  //othere wise we will get the old document back.
}).then((result) => {
  console.log(result); //we can also pass callback then we will not get promise back.
})
})
