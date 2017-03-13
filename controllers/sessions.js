var express = require('express');
var router = express.Router();
var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
	clientId:process.env.spotify_id,
	clientSecret:process.env.spotify_secret,
	redirectUri:process.env.spotify_redirect_uri
});

router.get('/login',function(req,res){

});

router.get('/handleauth',function(req,res){

	if(req.query){
		console.log('setting token!',req.query);
		spotifyApi.setAccessToken(req.query);
		location.redirect('/');
	}else{
		console.log('error setting query');
	}
	
});

module.exports = router;