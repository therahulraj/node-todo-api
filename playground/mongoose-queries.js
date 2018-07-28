const {ObjectID} = require('mongodb');//on objectid we have lot of utility methods that how we can create new object ids.

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../models/todo');


var id = '5b4ccb9a46e1a087e0bc1f0b';

if (!ObjectID.isValid(id)) {  //this will false if it is not valid or else it will return true.
  console.log('id is not valid');
}//this is a better method to validate the object before quering the database.


Todo.find({
  '_id': id
  //for here mongoose is fantastic we don't have to pass object id mongoose will gonna do for you.
  //it's gonna take that string change it into object id and then it will do for the query.
}).then((todos) => {
  console.log('Todos', todos);
})  //either we can pass no arguments or we can query by anything.

//nothing new instead that we can pass id as string with the help of mongoose.


//in mongoose the return value from the Todo.find() we get array of documets(records) and if we get only one documents then we get that object.





//it only returns one document at most it's going to match the query.
Todo.findOne({
  '_id': id
}).then((todo) => {
  console.log('Todos', todos);
})

//if you wanna work with quering a single document prefer using findOne becuase it returns
//the documens as object and if there is no item matched we will get null back and we
//work through that, it's difficult to work throgh out with an empty array.



//the next one is findById() and this is fantanstic if we have to find it by id
//it is identical to the findOne() here we don't have to pass the object and
//define the property.
Todo.findById(id).then((todo) => { //this will return null if no such id is found.
  if(!todo) {
    return console.log('Id not found.'); //this will help our code to handle if there is no such id available in the datatabse.
  }
  console.log('Todo by id', todo);
}).catch((e) => console.log(e));//this is warning that your object id doesn't just exist int the collection
//and it's actually completely invalid and the catch method let us to handle errors to show up.


//but there is one more method to handle errors to handle errors, what we're going to do is
//load in the objectid off the mongodb native driver and further we can further use if condition to validate the objectID using ObjectID.isValid
