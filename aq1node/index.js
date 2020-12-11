//Load HTTP module
const http = require("http");
const ws = require ("ws");
// Use Express
const express = require('express');
const Aq1DataFeed = require('./realtime');
const { Console } = require("console");

// Get the port number to host on
var portString = process.argv.slice(2);
var serverName = process.argv.slice(3);
if (portString[0] == null) {
  console.log('No port was passed as a parameter, eg. use node index.js 9000 server1');
  return;
}

if (serverName[0] == null) {
  console.log('No server name was passed in, eg use node index.js 9400 server2');
  serverName = 'unknownServer'
}
var port = parseInt(portString);
console.log('Hosting on port: ', port);
console.log('Connect on: http://localhost:', port);

// TODO: Get the name of the server from the command line
// Port cant be static needs to be set when starting
// http://localhost:9000
// ws://localhost:9010

const wsport = port + 10;
const app = express();
console.log(Aq1DataFeed);
// Sets up the web socket and starts sending values and averages to any client
var feed = new Aq1DataFeed(wsport);

// Setup middleware for attaching a cookie to the initial index request
function attach_cookie(url, cookie, value) {
  return function(req, res, next) {
    //console.log("req.url is ", req.url);
    if (req.url == url) {
      res.cookie(cookie, value, {httpOnly: true});
    }
    next();
  }
}

app.use(attach_cookie('/', 'aqserverport', port));

app.use(express.static(process.cwd()+"/static/"));

app.get('/', (req, res) => {
    // Here we serve the angular client
    res.sendFile(process.cwd()+"/static/index.html");
});

// There are two required apis, one is to get the servers name
// The second returns the current moving average

app.get('/api/servername', (req, res) => {
    // Return the servers name, this is used by clients of the django server to tell client servers apart
    res.send(JSON.stringify({name: serverName}));
});

// Returns the current moving average
app.get('/api/mva', (req, res) => {
  res.send(JSON.stringify({data: feed.getRecentAverage()}))
});

// The port that we listen to for API requests
app.listen(port, () => {
  console.log(`NodeJS server listening on ${port} for REST requests`)
});
