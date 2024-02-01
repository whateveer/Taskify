const mongoose = require("mongoose");

// Create a MongoDB Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

// Create a MongoDB Model
const User = mongoose.model("User", userSchema);

module.exports = User;
