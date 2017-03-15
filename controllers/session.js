const express = require('express');
var router = express.Router();
var server = require('../index.js');
var votingService = require('../services/votingService.js');

var io = require('socket.io')(server);
var nio = io.of('/socketspace');

votingService.setIo(nio);

nio.on('connection',function(socket){
	console.log('connected!!!!!!!!!!!!!!');
	socket.on('on',function(e){
		console.log('on');
		nio.emit('on');
	})
	socket.on('off',function(e){
		console.log('off');
		nio.emit('off');
	})
});

router.get('/startSong',function(req,res){
	console.log('hey');
	votingService.startSong()
	res.status(200).send({data:'success!'});
});

module.exports = router;