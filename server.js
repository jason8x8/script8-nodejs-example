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

app.post('/logger', logger);

function main(req, res) {
    console.log(req.query);
    console.log(req.body);

    console.log("Here's an hello world example");

    fs.readFile(path.join(__dirname,'./xml/cpxml-helloworld.xml'), 'utf8', function(err, data) {
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
