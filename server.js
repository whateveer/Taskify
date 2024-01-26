const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const app = express();
const port = 3000;
const hostname = "localhost";

// Connect to MongoDB
mongoose.connect("mongodb+srv://samal:21Lr3gpbpjTu52eH@taskify.uhcmpsm.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a MongoDB Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

// Create a MongoDB Model
const User = mongoose.model("User", userSchema);

// Middleware for parsing JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use('/styles', express.static(__dirname + '/styles'));
app.use('/public', express.static(__dirname + '/public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/registr', (req, res) => {
    res.sendFile(__dirname + '/registr.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.get('/workspace', (req, res) => {
    res.sendFile(__dirname + '/workspace.html');
});

app.post('/register', async (req, res) => {
    try {
        const { name, email, password, repeatPassword } = req.body;

        // Validate form fields
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


app.post('/login', async (req, res) => {
  
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

app.listen(port, () =>
    console.log(`App listening at http://${hostname}:${port}`)
);
