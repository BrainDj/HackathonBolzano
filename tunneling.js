const express = require('express');
const robot = require('robotjs');
const fetch = require('node-fetch');
const app = express();

var port = 8000;

robot.typeString("Hello World");
robot.keyTap("enter");

app.get('/', (req, res) => {
    res.send("Hello World");
});

// new version
const localtunnel = require('localtunnel');

const tunnel = localtunnel(port, { subdomain: 'hello'} , (err, tunnel) => {
    fetch('https://googlehomeinterface.herokuapp.com/tunnel/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body:JSON.stringify({'tunnel':tunnel.url})
    })
});

app.listen(port, () => {
    console.log("Server running on port " + port);
});

tunnel.on('close', function() {
    // When the tunnel is closed
    console.log("Connection closed")
});

// tunnel.close();