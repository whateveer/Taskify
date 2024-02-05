const mongoose = require("mongoose");
const { Schema } = mongoose;
// Create a MongoDB Schema

const tokenSchema = new mongoose.Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    refreshToken: {type: String, required: true},
})

// Create a MongoDB Model
const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
