// routes/tasks.js
const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const authMiddleware = require("../middlewares/auth-middleware");

router.use(authMiddleware)

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const userId = req.user;

    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new task
router.post("/", async (req, res) => {
  try {
    const userid = req.user;

    const task = new Task({
      userId: userid,
      text: req.body.text,
    });

    console.log(task);
    const newTask = await task.save();

    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a task
router.put("/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { text: req.body.text },
      { new: true }
    );
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a task
router.delete("/:id", async (req, res) => {
  try {
    const result = await Task.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mark a task as completed or uncompleted
router.patch("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    task.completed = req.body.completed;
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
