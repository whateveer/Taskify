require("dotenv").config();
const express = require("express");
const taskRoutes = require("./routes/tasks");
const connectDB = require("./config/database");
const routes = require("./routes/index");
const cookieParser = require("cookie-parser");
//const authMiddleware = require("./middlewares/auth-middleware");

const app = express();
const port = 3000;
const hostname = "localhost";

// Connect to the database
connectDB();

// Serve static files
app.use("/webpages", express.static(__dirname + "/webpages"));
app.use("/scripts", express.static(__dirname + "/scripts"));
app.use("/styles", express.static(__dirname + "/styles"));
app.use("/public", express.static(__dirname + "/public"));

// Middleware

app.use(express.json());
app.use(cookieParser());

//Eto vse lomalo ¯\_(ツ)_/¯
//app.use(notFound)

// Use routes
app.use("/", routes);
app.use("/api/v1/tasks", taskRoutes); //, authMiddleware

// app.use("/api/v1/tasks", taskRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`App listening at http://${hostname}:${port}`)
);
