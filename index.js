var express = require('express');
var app = express();
var server = module.exports = require('http').Server(app);
var bodyParser = require('body-parser');
var cors = require('cors');

require('dotenv').load();

app.use(cors());
app.use(bodyParser.json());

app.use(express.static('public'));

var session = require('./middleware/session.js');
app.use(session);

var sessionController = require(__dirname+'/controllers/session.js');
var authController = require(__dirname+'/controllers/auth.js');
var spotifyController = require(__dirname+'/controllers/spotify.js');
app.use('/api/session',sessionController);
app.use('/api/auth',authController);
app.use('/api/spotify',spotifyController);

app.get('*',function(req,res){
	res.sendFile(__dirname+'/public/index.html');
});

server.listen(3000,function(){
	console.log('listening on port 3000');
});