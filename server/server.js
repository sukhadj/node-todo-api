const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose.js');
const {User} = require('./models/user.js');
const {Todo} = require('./models/todo.js');

var app = express();

app.use(bodyParser.json());

app.post('/todos',(req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  },(e) => {
    // console.log("Unable to save Todo");
    res.status(400).send(e);
  })

});

// change url
app.get('/todos',(req, res) => {
  Todo.find({}).then((todos) => {
    res.send({todos});
  },(err) => {
    res.status(400).send(err);
  })
});

app.listen(3000, () => {
  console.log("Started on port 3000");
});

module.exports = {
  app
}
