const express = require("express");
const taskRoutes =require("./routes/tasks")
const connectDB = require("./config/database");
const routes = require("./routes/index"); // /index added
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handlers");
const cookieParser = require("cookie-parser")


const app = express();
const port = 3000;
const hostname = "localhost";

// Connect to the database
connectDB();

// Serve static files
app.use('/webpages', express.static(__dirname + '/webpages'));
app.use('/styles', express.static(__dirname + '/styles'));
app.use('/public', express.static(__dirname + '/public'));

// Middleware

app.use(express.json())
app.use(cookieParser())

//Eto vse lomalo ¯\_(ツ)_/¯
//app.use(notFound)   

app.use(errorHandlerMiddleware)

// Use routes
app.use('/', routes);
app.use('/api/v1/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(port, () =>
    console.log(`App listening at http://${hostname}:${port}`)
);
