var express = require('express');
var router = express.Router();

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
		req.session.setToList(playlist.body);
		req.spotifyApi.addTracksToPlaylist(req.session.getUser().id,playlist.body.id,[req.body.song]).then(song=>{
			res.send(playlist.body);
		}).catch(err=>{
			console.log('error adding',err)
			res.send(error);
		})
	}).catch(err=>{
		console.log('error creating!',err);
		res.send(err);
	});
});

router.post('/setFromList',function(req,res){
	req.session.setFromList(req.body);
	console.log('from!!',req.body,req.session.getFromList());
	res.send({data:'success'});
});

module.exports = router;