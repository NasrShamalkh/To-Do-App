const router = require('express').Router();
const TodoModel = require('./models');

// add a todo to the database
router.post('/api/todos', (req, res) => {
  // first we check to see if the todo exists based on its content
  TodoModel.findOne({ content: req.body.content })
    .then(todo => {
      if (!todo) {
        const content = req.body.content;
        const newTodo = new TodoModel({ content });
        newTodo.save().then(() => {
          console.log(
            `New Todo with _id ${newTodo._id} is saved to the database`
          );
          res.send(newTodo);
        });
      } else {
        res.send('Todo element already exist !');
      }
    })
    .catch(err => {
      console.log('Error in finding todo in post request', err);
      res.send('Error in finding todo in post request', err);
    });
});

// get all todos
router.get('/api/todos', (req, res) => {
  TodoModel.find({}, (err, data) => {
    if (err) {
      console.log('Error in finding all data', err);
      res.send('Error in finding all data', err);
    } else {
      console.log(typeof data);
      if (data.length === 0) {
        res.send("It seems you don't have any todos");
      } else {
        res.json(data);
      }
    }
  });
});

//delete all todos
router.delete('/api/todos', (req, res) => {
  TodoModel.remove({}, err => {
    if (err) {
      console.log("Couldn't delete all data", err);
      res.send('couldnt delete all data', err);
    } else {
      res.send('All todos are deleted !');
    }
  });
});

// updata a todo 'done' status
router.put('/api/todos/:_id', (req, res) => {
  const _id = req.params._id;
  // use findOne and update
  TodoModel.findOne({ _id }).then(data => {
    if (data) {
      TodoModel.findOneAndUpdate({ _id }, { done: true }, err => {
        if (err) {
          console.log('Error while updating a todo status', err);
          res.send('Error while updating a todo status', err);
        } else {
          console.log(`stauts of todo with id of ${_id} is changed`);
          res.send(`stauts of todo with id of ${_id} is changed`);
        }
      });
    } else {
      res.send(`No todo with such id ${_id}`);
    }
  });
});

// delete a todo based on _id
router.delete('/api/todos/:_id', (req, res) => {
  const _id = req.params._id;

  TodoModel.findOneAndDelete({ _id }, err => {
    if (err) {
      console.log(`Error in deleting element with _id ${_id}`);
      res.send(`Error in deleting element with _id ${_id}`);
    } else {
      console.log(`Todo with _id ${_id} is deleted`);
      res.send(`Todo with _id ${_id} is deleted`);
    }
  });
});

module.exports = router;
