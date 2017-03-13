var authCode;

var session = new Session(authCode);

function sessionAuth(req,res,next){
	if(req){
		req.session = session;
	}
	next();
}

function Session(code){

	this.code = code;

	this.setAuthCode = function(code){
		this.code = code;
	}
	this.getAuthCode = function(){
		return this.code;
	}
}

module.exports = sessionAuth;