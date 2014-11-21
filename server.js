var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    server = app.listen(3000),
    io = require('./server/socket').listen(server);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/build/index.html');
});

app.use(express.static(__dirname + '/build/'));
