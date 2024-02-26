const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const authMiddleware = require("../middlewares/auth-middleware");

router.use(authMiddleware)

router.post('/', async (req, res) => {
  try {
    const userId = req.user;

    const {day, month, year, events } = req.body;

    // Create a new event object based on the Event model
    const event = new Event({userId, day, month, year, events });
    console.log(event)

    // Save the event to the database
    await event.save();
    console.log("Event are saved in db")
    // Respond with the saved event
    res.status(201).json(event);
  } catch (error) {
    // If an error occurs, respond with an error message
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const userId = req.user;

    const events = await Event.find({ userId }).sort({ createdAt: -1 });
    
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
