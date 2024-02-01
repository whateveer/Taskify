const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single task
router.get('/:id', getTask, (req, res) => {
    res.json(res.task);
});

// Create a task
router.post('/', async (req, res) => {
    const task = new Task({
        name: req.body.name,
        description: req.body.description
    });
    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a task
router.patch('/:id', getTask, async (req, res) => {
    if (req.body.name != null) {
        res.task.name = req.body.name;
    }
    if (req.body.description != null) {
        res.task.description = req.body.description;
    }
    if (req.body.completed != null) {
        res.task.completed = req.body.completed;
    }
    try {
        const updatedTask = await res.task.save();
        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a task
router.delete('/:id', getTask, async (req, res) => {
    try {
        await res.task.remove();
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

async function getTask(req, res, next) {
    try {
        const task = await Task.findById(req.params.id);
        if (task == null) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.task = task;
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = router;
