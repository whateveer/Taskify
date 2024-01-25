const express = require("express");
const path = require('path');
const app = express();
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/public', express.static(path.join(__dirname, 'public')));
const port = 3000;
const hostname = "localhost";


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/registr', (req, res) => {
    res.sendFile(__dirname + '/registr.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.listen(port, () =>
    console.log(`App listening at http://${hostname}:${port}`)
);
