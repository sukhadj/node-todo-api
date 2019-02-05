// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true },(error, client) => {
  if (error) {
    console.log(`Unable to connect to mongodb ${error.message}`);
    return;
  }
  console.log('Connected to MongoDB server');

  const db = client.db('TodoApp');

  // db.collection('Todos').find({completed:false}).toArray().then((docs) => {
  //   console.log("Todos");
  //   console.log(JSON.stringify(docs, undefined, 2));
  // },(err) => {
  //   console.log("Unable to fetch docs");
  // });

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Count is ${count}`);
  // },(err) => {
  //   console.log("Unable to fetch docs");
  // });

  db.collection('Users').find({username:'sukhadj'}).toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
  },(err) => {
    console.log(err.message);
  });

  client.close();
});
