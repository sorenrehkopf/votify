var express = require('express');
var router = express.Router();
var votingService = require('../services/votingService.js');

router.get('/getPlaylists',function(req,res){
	console.log('hey!');
	req.spotifyApi.getUserPlaylists().then(function(data){
		res.send(data.body);
	},
	function(err){
		console.log('error!',err);
		req.spotifyApi.refreshAccessToken().then(function(data){
			req.spotifyApi.setAccessToken(data.body['access_token']);
		})
	});
})

router.post('/createPlaylist',function(req,res){
	console.log('creating!',req.body);
	console.log('user1!1',req.session.getUser(),req.body.title);
	req.spotifyApi.createPlaylist(req.session.getUser().id,req.body.title,{public:false}).then(playlist=>{
		console.log('created!',playlist);
		votingService.setToList(playlist.body);
		votingService.setSong({userId:req.session.getUser().id,song:req.body.song,res:res});
	}).catch(err=>{
		console.log('error creating!',err);
		res.send(err);
	});
});

router.post('/setFromList',function(req,res){
	req.session.setFromList(req.body);
	req.spotifyApi.getPlaylistTracks(req.session.getUser().id,req.body.id).then(data=>{
		votingService.setFromList(data.body.items);
	}).catch(err=>{
		console.log('error!',err);
	});
	res.send({data:'success'});
});

module.exports = router;