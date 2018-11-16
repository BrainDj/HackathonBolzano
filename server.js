const express = require('express');
const robot = require('robotjs');
const app = express();

var port = 4000;

robot.typeString("Hello World");
robot.keyTap("enter");

app.listen(port, () => {
    console.log("Server running on port " + port);
})