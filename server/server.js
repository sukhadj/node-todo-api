const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');

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


app.get('/todos',(req, res) => {
  Todo.find({}).then((todos) => {
    res.send({todos});
  },(err) => {
    res.status(400).send(err);
  })
});


app.get('/todos/:id',(req, res) => {
  var id = req.params.id;

  if(!ObjectId.isValid(id))
  {
      return res.status(400).send({err: 'Todo Id is invalid'});
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
        return res.status(404).send({err: 'Todo not found'});
    }
    res.send({todo});
  });

});

app.listen(3000, () => {
  console.log("Started on port 3000");
});

module.exports = {
  app
}
