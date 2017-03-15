const express = require('express');
var router = express.Router();
var server = require('../index.js');
var votingService = require('../services/votingService.js');

var io = require('socket.io')(server);
var nio = io.of('/socketspace');

votingService.setIo(nio);

nio.on('connection',function(socket){
	console.log('connected!!!!!!!!!!!!!!');
});

router.get('/startSong',function(req,res){
	console.log('hey');
	votingService.startSong(nio);
	res.status(200).send({data:'success!'});
});

router.get('/stop',function(req,res){
	console.log('stopping!');
	votingService.stop();
	res.status(200).send({data:'success!'});
})

router.post('/vote',function(req,res){
	console.log(req.body);
	votingService.vote(req.body.which);
	nio.emit('vote',{which:req.body.which});
	res.send('success!');
});

module.exports = router;