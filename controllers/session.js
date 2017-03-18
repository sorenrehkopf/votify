const express = require('express');
var router = express.Router();
var server = require('../index.js');
var votingService = require('../services/votingService.js');

var io = require('socket.io')(server);
var nio = io.of('/socketspace');

votingService.setIo(nio);

nio.on('connection',function(socket){
	console.log('connected!!!!!!!!!!!!!!');
	socket.on('vote',function(data){
		votingService.vote(data.which);
		nio.emit('new-vote',data);
	})
});

router.get('/startSong',function(req,res){
	votingService.startSong(nio);
	res.status(200).send({data:'success!'});
});

router.get('/stop',function(req,res){
	console.log('stopping!');
	votingService.stop();
	req.session.setFromList(null);
	res.status(200).send({data:'success!'});
})

router.post('/vote',function(req,res){
	votingService.vote(req.body.which);
	nio.emit('new-vote',req.body);
	res.send('success');
});

router.get('/currentChoices',function(req,res){
	var choices = votingService.choices;
	var feChoices = [{name:'no choices yet!'}];
	if(choices){
		feChoices = choices.map((c,i)=>{
			c.track.score = votingService.votes[i].votes;
			return c.track;
		});
	}
	res.send(feChoices);
});

module.exports = router;
