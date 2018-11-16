const express = require('express');
const robot = require('robotjs');
const app = express();

var port = 8000;

robot.typeString("Hello World");
robot.keyTap("enter");

app.get('/', (req, res) => {
    res.send("Hello World");
})

app.listen(port, () => {
    console.log("Server running on port " + port);
})