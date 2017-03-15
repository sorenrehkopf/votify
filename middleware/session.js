var SpotifyWebApi = require('spotify-web-api-node');
var paths = ['/api/auth','api/spotify'];

var spotifyApi = new SpotifyWebApi({
	clientId:process.env.spotify_id,
	clientSecret:process.env.spotify_secret,
	redirectUri:process.env.spotify_redirect_uri
});

var session = new Session();

function sessionAuth(req,res,next){
	var needsSession = false;
	paths.forEach(path=>{
		if(req.path.indexOf(path)!== -1) needsSession = true;
	});
	if(req && needsSession){
		req.spotifyApi = spotifyApi;
		req.session = session;
		console.log(session.getUser());
	}
	next();
	
}

function Session(){

	return {
		setToken:setToken.bind(this),
		checkToken:checkToken.bind(this),
		getToken:getToken.bind(this),
		clearToken:clearToken.bind(this),
		setToList:setToList.bind(this),
		getToList:getToList.bind(this),
		setFromList:setFromList.bind(this),
		getFromList:getFromList.bind(this),
		setUser:setUser.bind(this),
		getUser:getUser.bind(this)
	}

	function setToken(){
		var token = '';
		for(var i=0;i<15;i++){
			var newChar = Math.round(Math.random() * 9);
			token += newChar;
		}
		this.sessionToken = token;
		return token;
	}

	function clearToken(){
		this.sessionToken = null;
	}

	function checkToken(token){
		return token === this.sessionToken;
	}

	function getToken(){
		return this.sessionToken;
	}

	function setToList(playlist){
		this.toList = playlist;
	}

	function getToList(){
		return this.toList;
	}

	function setFromList(playlist){
		this.fromList = playlist;
	}

	function getFromList(){
		return this.fromList;
	}

	function setUser(user){
		console.log(user);
		this.user = user;
	}

	function getUser(){
		return this.user;
	}
}

module.exports = sessionAuth;