// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true },(error, client) => {
  if (error) {
    console.log(`Unable to connect to mongodb ${error.message}`);
    return;
  }
  console.log('Connected to MongoDB server');

  const db = client.db('TodoApp');

  // deleteMany
  // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // },(err) => {
  //   console.log(err.message);
  // })

  // db.collection('Users').deleteMany({username: 'sukhadj'}).then((result) => {
  //   console.log(result);
  // },(err) => {
  //   console.log(err.message);
  // })


  // deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // },(err) => {
  //   console.log(err.message);
  // })

  // findOneAndDelete
  // db.collection('Todos').findOneAndDelete({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // },(err) => {
  //   console.log(err.message);
  // })

  db.collection('Users').findOneAndDelete({_id: ObjectId('5c58753780f1424b2483ce95')}).then((result) => {
    console.log(result);
  },(err) => {
    console.log(err.message);
  })


  client.close();
});
