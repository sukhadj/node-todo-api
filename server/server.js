var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/TodoApp",{ useNewUrlParser: true });

var Todo = mongoose.model('Todo', {
    text: {
      type: String,
      required: true,
      minlength: 1,
      trim: true  // remove preceeding and following whitespaces
    },
    completed: {
      type: Boolean,
      default: false
    },
    completedAt: {
      type: Number,
      default: null
    }
});

var newTodo = new Todo({
  text: "GRE Test ",
  completed: false,
  completedAt: 123
});

// newTodo.save().then((doc) => {
//   console.log(doc);
// },(err) => {
//   console.log("Unable to solve todo");
// });

var User = mongoose.model('User',{
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

var newUser = new User({
  // email: "sukhadj1998"
})

newUser.save().then((doc) => {
  console.log(doc);
},(err) => {
  console.log(`User cannot be saved : ${err.message}`);
})
