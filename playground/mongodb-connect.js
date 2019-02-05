// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true },(error, client) => {
  if (error) {
    console.log(`Unable to connect to mongodb ${error.message}`);
    return;
  }
  console.log('Connected to MongoDB server');

  const db = client.db('TodoApp');

  // db.collection('Todos').insertOne({
  //   text: "Something to do",
  //   completed: false
  // },(error, result) => {
  //   if (error) {
  //     return console.log('Unable to insert document');
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  db.collection('Users').insertOne({
    username: "sukhadj",
    password: "sukhad1998"
  },(error, result) => {
    if (error) {
      return console.log('Unable to insert document');
    }
    // console.log(JSON.stringify(result.ops, undefined, 2));
    console.log(result.ops[0]._id.getTimestamp());
  });

  client.close();
});
