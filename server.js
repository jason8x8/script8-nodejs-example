var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var basicAuth = require('basic-auth-connect');

var app = express();

app.use(basicAuth('admin', 'password'));

app.use('/music', express.static("./music"));
app.use('/xml', express.static("./xml"));

app.use(bodyParser.json());

// app router
app.post('/', main);
app.get('/', main);

app.post('/conference', conference);
app.get('/conference', conference);

app.post('/voice2pstn', voice2pstn);
app.get('/voice2pstn', voice2pstn);

app.post('/logger', logger);

function main(req, res) {
    conference(req,res);
}

function conference(req, res) {
    console.log(req.query);
    console.log(req.body);

    console.log("Here's hello world example");

//    fs.readFile(path.join(__dirname,'./xml/cpxml-helloworld.xml'), 'utf8', function(err, data) {
//    fs.readFile(path.join(__dirname,'./xml/cpxml-get-ssn.xml'), 'utf8', function(err, data) {
    fs.readFile(path.join(__dirname,'./xml/conference.xml'), 'utf8', function(err, data) {
//    fs.readFile(path.join(__dirname,'./xml/voice-proxy.xml'), 'utf8', function(err, data) {
        if (err) {
            res.writeHead(404, {
                'Content-Type': 'application/xml'
            });
            res.end(data);
            return console.log(err);
        }
        console.log(data);
        res.writeHead(200, {
            'Content-Type': 'application/xml'
        });
        res.end(data);
    });
}

function voice2pstn(req, res) {
    console.log(req.query);
    console.log(req.body);

    console.log("Here's hello world example");

//    fs.readFile(path.join(__dirname,'./xml/cpxml-helloworld.xml'), 'utf8', function(err, data) {
//    fs.readFile(path.join(__dirname,'./xml/cpxml-get-ssn.xml'), 'utf8', function(err, data) {
    fs.readFile(path.join(__dirname,'./xml/voice-proxy.xml'), 'utf8', function(err, data) {
        if (err) {
            res.writeHead(404, {
                'Content-Type': 'application/xml'
            });
            res.end(data);
            return console.log(err);
        }
        console.log(data);
        res.writeHead(200, {
            'Content-Type': 'application/xml'
        });
        res.end(data);
    });
}


app.get('/next', next);
app.post('/next', next);
function next(req, res) {
    console.log(req.query);
    console.log(req.body);

    var resp = "<cpxml>";

    var str = req.body.digits; 
    if(str) {
         var chuncks = str.match(/.{1,1}/g);
         var new_value = chuncks.join("-"); //returns 123-456-789
         resp += "<say>You entered "+new_value+"</say>";
    }
    resp += "<say>Your social security number is accepted</say>";
    resp += "<form id=\"bye\"><submit expr=\"'/hangup'\" httpMethod=\"POST\"><param name=\"dummy\" expr=\"1+2\"></param></submit></form>";

    resp += "</cpxml>";
    console.log(resp);
    res.writeHead(200, {
        'Content-Type': 'application/xml'
    });
    res.end(resp);
}

app.post('/hangup', hangup);
function hangup(req, res) {
    console.log("HANGUP");
    console.log(req.body);

    var resp = "<cpxml>";

    resp += "<say>Thank you using the service and good bye</say>";
    resp += "<hangup/>";
    resp += "</cpxml>";
    console.log(resp);
    res.writeHead(200, {
        'Content-Type': 'application/xml'
    });
    res.end(resp);
}

function logger(req, res) {
    //console.log(req.body);

    var level = req.body.level;
    var log = req.body.log;
    var ts = req.body.ts;
    var d = new Date(Number(ts));

    console.log(d.toLocaleTimeString() + " " + level + " : " + log);
    res.writeHead(200);
    res.end("OK");
}

/* Use PORT environment variable if it exists */
var port = process.env.PORT || 5000;
server = app.listen(port, function () {
  console.log('Server listening on port %d in %s mode', server.address().port, app.settings.env);
});
