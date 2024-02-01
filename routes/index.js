const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const path = require("path");

// Middleware for parsing JSON data
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Routes
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../webpages/index.html'));
});

router.get('/registr', (req, res) => {
    res.sendFile(path.join(__dirname, '../webpages/registr.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../webpages/login.html'));
});

router.get('/workspace', (req, res) => {
    res.sendFile(path.join(__dirname, '../webpages/workspace.html'));
});

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, repeatPassword } = req.body;

        // Validate form field
        if (!name || !email || !password || !repeatPassword) {
            return res.status(400).send("All fields must be filled out.");
        }

        if (password !== repeatPassword) {
            return res.status(400).send("Passwords do not match.");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).send("User registered successfully!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/login', async (req, res) => {
  
    try {
        const { email, password } = req.body;

        // Validate form fields
        if (!email || !password) {
            return res.status(400).send("Both email and password are required.");
        }

        // Check if the user with the provided email exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send("User not found. Please register.");
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send("Invalid password.");
        }

        // Redirect to the home page (workspace) after successful login
     
        res.redirect('/workspace');
       

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
