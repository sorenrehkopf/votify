const express = require('express');
var router = express.Router();
var server = require('../index.js');

var io = require('socket.io')(server);

io.on('connection',function(socket){
	console.log('connected!!!!!!!!!!!!!!');
	socket.on('on',function(e){
		console.log('on');
		io.emit('on');
	})
	socket.on('off',function(e){
		console.log('off');
		io.emit('off');
	})
});

router.post('/',function(req,res){
	console.log('hey');
	io.emit('hey');
	res.status(200).send('success!');
});

module.exports = router;