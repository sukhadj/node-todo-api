// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true },(error, client) => {
  if (error) {
    console.log(`Unable to connect to mongodb ${error.message}`);
    return;
  }
  console.log('Connected to MongoDB server');

  const db = client.db('TodoApp');

  db.collection('Todos').findOneAndUpdate({_id: ObjectId("5c587844c0f3944c006dbcc3")},{$set: {completed:false}}).then((result) => {
    console.log(result);
  },(err) => {
    console.log(err.message);
  })

  client.close();
});
