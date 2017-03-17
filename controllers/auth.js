var express = require('express');
var router = express.Router();
var votingService = require('../services/votingService.js');

var scopes = ['playlist-modify-private','playlist-modify-public','playlist-read-private'];
var state = "";

router.get('/login',function(req,res){
	var authUrl = req.spotifyApi.createAuthorizeURL(scopes,state);
	if(req.session.getToken()) res.send('Someone else is acting as the admin for this session. Only one admin is permitted at a time.');
	else res.redirect(authUrl);
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
		    var token = req.session.setToken();
		    req.spotifyApi.getMe().then(data=>{
		    	console.log('got me!!',data);
		    	req.session.setUser(data.body);
		    })
		    res.redirect('/admin?auth_token='+token);
		  }, function(err) {
		    console.log('Something went wrong!', err);
		  })
		
	}else{
		console.log('error setting query');
		res.send('error logging in');
	}
	
});

router.get('/check',function(req,res){
	var loggedIn = req.session.checkToken(req.headers.auth_token);
	console.log('loggedIn',loggedIn);
	var resp = loggedIn?{toList:votingService.toList,fromList:req.session.getFromList()}:false;
	console.log(resp);
	res.send(resp);
});

router.get('/logout',function(req,res){
	req.spotifyApi.resetAccessToken();
	req.spotifyApi.resetRefreshToken();
	req.session.clearToken();
	res.send({message:'logged out!'});
})

module.exports = router;