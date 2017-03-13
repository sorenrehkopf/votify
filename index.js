var express = require('express');
var app = express();
var server = module.exports = require('http').Server(app);
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

app.use(express.static('public'));

var apiController = require(__dirname+'/controllers/api.js');
// var socketController = require(__dirname+'/controllers/socket.js');
// app.use('/api/namespaces',socketController);
app.use('/api',apiController);

app.get('*',function(req,res){
	res.sendFile(__dirname+'/public/index.html');
});

server.listen(3000,function(){
	console.log('listening on port 3000');
});