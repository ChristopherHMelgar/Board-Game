var express = require('express');
var app = express();
var server = require('http').Server(app);

app.use(express.static('public'));

app.get('/', function(req, res){
    res.sendfile(__dirname + 'index.html');
});

server.listen(3000, function(){
   console.log("Server running in http://localhost:3000");
});