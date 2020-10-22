const mongoose = require('mongoose');

const TodosSchema = new mongoose.Schema({
  content: { type: String, required: true },
  done: { type: Boolean, default: false }
});

module.exports = TodoModel = mongoose.model('Todo', TodosSchema);
