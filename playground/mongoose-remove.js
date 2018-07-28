const {ObjectID} = require('mongodb');//on objectid we have lot of utility methods that how we can create new object ids.

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {users} = require('./../server/models/users');

// Todo.remove({}).then((result) => {
//   console.log(result);
// })

Todo.findOneAndRemove({_id: '5b5cbbb92b86f9534b74b798'}).then((todo) => {
  console.log(todo);
})
