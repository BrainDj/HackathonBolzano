const express = require('express');
const robot = require('robotjs');
var exec = require('child_process').exec;
var bodyParser = require('body-parser');
const app = express();

var port = 8000;
var child;

// parse application/json
app.use(bodyParser.json());

// Commands

app.get('/goLeft', (req, res) => {
    robot.keyTap("left");
})

app.get('/goRight', (req, res) => {
    robot.keyTap("right");
})

// Code to open full screen presentation
app.get('/openPresentation', (req, res) => {
    robot.moveMouse(336,55);
    robot.mouseClick();
    console.log("mouseClick")
    exec('python3 gestures.py', function(error, stdout, stderr){ callback(stdout); });
})

app.get('/finish', function (req, res) {

    // Finish presentation function with button escape
    function closePresentation(callback){
        robot.keyTap("escape")
    }

    closePresentation(function (output) {
        console.log(output)
    })
})

// Simple function to open the related file
app.get('/select', function (req, res) {

    var a;

    function openPresentation(callback) {
        a = exec('cd /Users/brunomarafinidj/Downloads/; open Keynote2.key', function(error, stdout, stderr){ callback(stdout); });
    }
    openPresentation(function (output) {
        console.log(a)
    })

})

// Function usable if you want to open Keynote
app.post('/start', function (req, res) {

    var action = req.body.key
    //write response
    //res.write('req:' + req.body);
    console.log('req:' + action)
    console.log(tunnel + '/test')

    // Create openPresentationFunction
    function openPresentation(callback) {
        exec('cd /Applications ; open -a Keynote', function(error, stdout, stderr){ callback(stdout); });
    }

// openPresentation
    openPresentation(function(output) {
        console.log(output);
    });

    //send response
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end();
});

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

const tunnel = localtunnel(port, { subdomain: 'hackathon'} , (err, tunnel) => {
    console.log("Local url: " + tunnel.url)
});

app.listen(port, () => {
    console.log("Server running on port " + port);
});

tunnel.on('close', function() {
    // When the tunnel is closed
    console.log("Connection closed")
});

var mouse = robot.getMousePos();
console.log(mouse)

// tunnel.close();