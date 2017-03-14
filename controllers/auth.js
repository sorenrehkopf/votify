var express = require('express');
var router = express.Router();

var scopes = ['playlist-modify-private','playlist-modify-public','playlist-read-private'];
var state = "";

router.get('/login',function(req,res){
	var authUrl = req.spotifyApi.createAuthorizeURL(scopes,state);
	res.redirect(authUrl);
});

router.get('/handleauth',function(req,res){
	if(req.query){
		var code = req.query.code;
		req.spotifyApi.authorizationCodeGrant(code)
		  .then(function(data) {
		    console.log('The token expires in ' + data.body['expires_in']);
		    console.log('The access token is ' + data.body['access_token']);
		    console.log('The refresh token is ' + data.body['refresh_token']);
		    console.log(data.body);
		    // Set the access token on the API object to use it in later calls
		    req.spotifyApi.setAccessToken(data.body['access_token']);
		    req.spotifyApi.setRefreshToken(data.body['refresh_token']);
		    res.redirect('/admin');
		  }, function(err) {
		    console.log('Something went wrong!', err);
		  })
		
	}else{
		console.log('error setting query');
	}
	
});

router.get('/logout',function(){
	req.spotifyApi.resetCredentials();
})

module.exports = router;