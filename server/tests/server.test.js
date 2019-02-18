const expect = require('expect');
const request = require('supertest');
const {ObjectId} = require('mongodb');

var {app} = require('./../server');
var {Todo} = require('./../models/todo');

const PseudoTodos = [{
  _id: new ObjectId(),
  text: 'First todo'
},{
  _id: new ObjectId(),
  text: 'Second todo'
}]

beforeEach((done) => {
  Todo.deleteMany({}).then(() => {
    return Todo.insertMany(PseudoTodos);
  }).then(() => {
    done();
  })
})


describe('POST /todos',() => {

  it('should create a new todo',(done) => {
    var text = 'Test todo text';

    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res) => {
      expect(res.body.text).toBe(text);
    })
    .end((err, res) => {
      if(err)
      {
        return done(err);
      }

      Todo.find({text: text}).then((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((e) => {
        done(e);
      })
    })

  });

  it('should not create new todo with invlid body',(done) => {

    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err, res) => {
      if(err)
      {
        return done(err);
      }
      Todo.find().then((todos) => {
        expect(todos.length).toBe(2);
        done();
      }).catch((e) => {
        done(e);
      })
    })

  });
});

describe('GET /todos',() => {
  it('should list all todos',(done) => {
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2);
    })
    .end(done)
  })
});


describe('GET /todos/:id',() => {
  it('should return correct todo',(done) => {
    request(app)
    .get(`/todos/${PseudoTodos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(PseudoTodos[0].text);
    })
    .end(done)
  });

  it('should return error for invalid id',(done) => {
    request(app)
    .get('/todos/12345')
    .expect(400)
    .expect((res) => {
      expect(res.body.err).toBe('Todo Id is invalid');
    })
    .end(done)
  });

  it('should return error for todo not found',(done) => {
    request(app)
    .get(`/todos/${new ObjectId()}`)
    .expect(404)
    .expect((res) => {
      expect(res.body.err).toBe('Todo not found');
    })
    .end(done)
  });

});


describe('DELETE /todos/:id',() => {
  it('should delete correct todo',(done) => {
    request(app)
    .delete(`/todos/${PseudoTodos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(PseudoTodos[0].text);
    })
    .end(done)
  });

  it('should return error for invalid id',(done) => {
    request(app)
    .delete('/todos/12345')
    .expect(400)
    .expect((res) => {
      expect(res.body.err).toBe('Todo Id is invalid');
    })
    .end(done)
  });

  it('should return error for todo not found',(done) => {
    request(app)
    .delete(`/todos/${new ObjectId()}`)
    .expect(404)
    .expect((res) => {
      expect(res.body.err).toBe('Todo not found');
    })
    .end(done)
  });

});


describe('PATCH /todos/:id',() => {
  var body = {
    text: "First todo updated",
    completed: true
  }

  it('should update the todo correctly',(done) => {
    request(app)
    .patch(`/todos/${PseudoTodos[0]._id.toHexString()}`)
    .send(body)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(body.text);
      expect(res.body.todo.completed).toBe(body.completed);
    })
    .end(done)
  });

  it('should return error for invalid id',(done) => {
    request(app)
    .patch('/todos/12345')
    .send(body)
    .expect(400)
    .expect((res) => {
      expect(res.body.err).toBe('Todo Id is invalid');
    })
    .end(done)
  });

  it('should return error for todo not found',(done) => {
    request(app)
    .patch(`/todos/${new ObjectId()}`)
    .send(body)
    .expect(404)
    .expect((res) => {
      expect(res.body.err).toBe('Todo not updated');
    })
    .end(done)
  });

});
