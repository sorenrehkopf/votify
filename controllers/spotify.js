var express = require('express');
var router = express.Router();

router.get('/getPlaylists',function(req,res){
	console.log('hey!');
	req.spotifyApi.getUserPlaylists().then(function(data){
		console.log('got playlists!', data.body);
		res.send(data.body);
	},
	function(err){
		console.log('error!',err);
		req.spotifyApi.refreshAccessToken().then(function(data){
			req.spotifyApi.setAccessToken(data.body['access_token']);
		})
	});
})

module.exports = router;