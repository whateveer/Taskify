require("dotenv").config();
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const path = require("path");
const uuid = require("uuid");
const mailService = require("../service/mail-service");
const tokenService = require("../service/token-service");
const UserDTO = require("../dtos/user-dto");

// Middleware for parsing JSON data
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Routes
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../webpages/index.html"));
});

router.get("/registr", (req, res) => {
  res.sendFile(path.join(__dirname, "../webpages/registr.html"));
});

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../webpages/login.html"));
});

router.get("/workspace", (req, res) => {
  res.sendFile(path.join(__dirname, "../webpages/workspace.html"));
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, repeatPassword } = req.body;

    //Check if email already in db
    const candidate = await User.findOne({ email });
    if (candidate) {
      throw new Error(`A user with the email address ${email} already exists`);
    }

    // Validate form field
    if (!name || !email || !password || !repeatPassword) {
      return res.status(400).send("All fields must be filled out.");
    }

    if (password !== repeatPassword) {
      return res.status(400).send("Passwords do not match.");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Random unique string
    const activationLink = uuid.v4();

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      activationLink,
    });

    // Save the user to the database
    await newUser.save();

    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/activate/${activationLink}`
    );

    const userDTO = new UserDTO(newUser);
    const tokens = tokenService.generateTokens({ ...userDTO });
    await tokenService.saveToken(userDTO.id, tokens.refreshToken);

    //Saving refresh token in cookies
    res.cookie("RefreshToken", tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.json({ ...tokens, newUser: userDTO });
    // return res.json(tokens)

    res.status(201).send("User registered successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/login", async (req, res) => {  //ALSO ADD TOKEN 
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

    const userDTO = new UserDTO(user);
    const tokens = tokenService.generateTokens({ ...userDTO });
    await tokenService.saveToken(userDTO.id, tokens.refreshToken);
    return res.json({ ...tokens, user: userDTO });

    // Redirect to the home page (workspace) after successful login

    res.redirect("/workspace");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/logout", async (req, res) => {
  try {
  } catch (e) {}
});

router.get("/activate/:link", async (req, res) => {
  try {
    const activationLink = req.params.link;
    const user = await User.findOne({ activationLink });

    if (!user) {
      throw new Error("Incorrect acrivation link");
    }

    user.isActivated = true;
    await user.save();

    //THEN REDIRECT USER TO THE PAGE
    //res.redirect(process.env.CLIENT_URL)

    //что то не редиректится ¯\_(ツ)_/¯
  } catch (e) {}
});

router.get("/refresh", async (req, res) => {
  try {
    res.json(["123", "456"]);
  } catch (e) {}
});

module.exports = router;
