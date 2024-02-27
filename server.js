require("dotenv").config();
const express = require("express");
const taskRoutes = require("./routes/tasks");
const connectDB = require("./config/database");
const routes = require("./routes/index");
const cookieParser = require("cookie-parser");
const authMiddleware = require("./middlewares/auth-middleware");
const eventsRouter = require('./routes/events');
const rateLimit = require('express-rate-limit')

const app = express();
const port = 3000;
const hostname = "localhost";

// Connect to the database
connectDB();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15 minutes
	limit: 100, // Limit each IP to 100 requests per `window`
})


// Serve static files
app.use("/webpages", express.static(__dirname + "/webpages"));
app.use("/scripts", express.static(__dirname + "/scripts"));
app.use("/styles", express.static(__dirname + "/styles"));
app.use("/public", express.static(__dirname + "/public"));

// Middleware

app.use(express.json());
app.use(cookieParser());
app.use(limiter)
//Eto vse lomalo ¯\_(ツ)_/¯
//app.use(notFound)

//Use middleware globally
//app.use(authMiddleware)


// Use routes
app.use("/", routes);
app.use("/api/v1/tasks", taskRoutes); //, authMiddleware
app.use('/api/v1/events', eventsRouter);

// app.use("/api/v1/tasks", taskRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`App listening at http://${hostname}:${port}`)
);
