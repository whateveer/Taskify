// const mongoose = require("mongoose");

// const taskSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   completed: { type: Boolean, default: false },
// });

// const Task = mongoose.model("Task", taskSchema);

// module.exports = Task;
// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('Task', taskSchema);
