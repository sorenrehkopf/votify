var paths = ['/api/auth','api/spotify','api/session'];
var spotifyApi = require('../services/spotifyService.js');

var session = new Session();

function sessionAuth(req,res,next){
	var needsSession = false;
	paths.forEach(path=>{
		if(req.path.indexOf(path)!== -1) needsSession = true;
	});
	if(req && needsSession){
		req.spotifyApi = spotifyApi;
		req.session = session;
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
		if(this.sessionToken){
			return token === this.sessionToken;
		}else{
			return false;
		}
		
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
		console.log('setting user!!',user);
		this.user = user;
	}

	function getUser(){
		console.log('getting user!',this.user);
		return this.user;
	}
}

module.exports = sessionAuth;