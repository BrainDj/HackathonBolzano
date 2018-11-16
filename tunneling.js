const express = require('express');
const robot = require('robotjs');
const fetch = require('node-fetch');
var exec = require('child_process').exec;
const app = express();

var port = 8000;
var child;

robot.typeString("Hello World");
robot.keyTap("enter");

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.post('/test', (req, res) => {
    console.log(req.body.action);
})

app.get('/open/program/:programId', (req, res) => {  
    child = exec(req.params.programId, function (error, stdout, stderr) {
        console.log(stdout);
        res.send(stdout)
        if (error !== null) {
        console.log('exec error: ' + error);
        }
    });
});



// new version
const localtunnel = require('localtunnel');

const tunnel = localtunnel(port, { subdomain: 'hello'} , (err, tunnel) => {
    console.log("Local url: " + tunnel.url)
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