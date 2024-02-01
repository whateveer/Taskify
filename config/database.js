const mongoose = require("mongoose");

// Connect to MongoDB
async function connectDB() {
    try {
        await mongoose.connect("mongodb+srv://samal:21Lr3gpbpjTu52eH@taskify.uhcmpsm.mongodb.net/?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

module.exports = connectDB;
