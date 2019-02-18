const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');

const {mongoose} = require('./db/mongoose.js');
const {User} = require('./models/user.js');
const {Todo} = require('./models/todo.js');

var app = express();

app.use(bodyParser.json());


// POST /todos
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


// GET /todos
app.get('/todos',(req, res) => {
  Todo.find({}).then((todos) => {
    res.send({todos});
  },(err) => {
    res.status(400).send(err);
  })
});


// GET /todos/:id
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


// DELETE /todos/:id
app.delete('/todos/:id',(req, res) => {
  var id = req.params.id;

  if(!ObjectId.isValid(id))
  {
      return res.status(400).send({err: 'Todo Id is invalid'});
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
        return res.status(404).send({err: 'Todo not found'});
    }
    res.send({todo});
  });
});


// PATCH /todos/:id
app.patch('/todos/:id',(req, res) => {
  var id = req.params.id;

  var body = _.pick(req.body, ['text','completed']);

  if(!ObjectId.isValid(id))
  {
      return res.status(400).send({err: 'Todo Id is invalid'});
  }

  if(_.isBoolean(body.completed) && body.completed)
  {
    body.completedAt = new Date().getTime();
  }else{
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body},{new : true}).then((todo) => {
    if(!todo)
    {
      return res.status(404).send({err: 'Todo not updated'});
    }
    res.send({todo})
  }).catch((e) => {
    res.status(400).send();
  })
});



app.listen(3000, () => {
  console.log("Started on port 3000");
});

module.exports = {
  app
}
