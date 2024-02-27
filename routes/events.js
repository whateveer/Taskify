const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const authMiddleware = require("../middlewares/auth-middleware");

router.use(authMiddleware)

router.post('/', async (req, res) => {
  try {
    const userId = req.user;
    const {day, month, year, events } = req.body;

    const event = new Event({userId, day, month, year, events });

    await event.save();
    res.status(201).json(event);
  } catch (error) {
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


router.delete("/:id", async (req, res) => {
  try {
    console.log(req.params.id)
    const result = await Event.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
