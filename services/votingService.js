var spotifyApi = require('./spotifyService.js');

function VotingService(){

	this.setFromList = function(playlist){
		console.log('setting from',playlist);
		this.fromList = playlist;

	}

	this.setSong = function(config){
		if(config){
			this.userId = config.userId;
		}
		var thiz = this;
		if(config){
			var song = config.song
			spotifyApi.addTracksToPlaylist(thiz.userId,thiz.toList.id,[song.uri]).then(song=>{
				config.res.send(thiz.toList);
			}).catch(err=>{
				console.log('error adding',err)
				config.res.send(err);
			});
		}else{
			var song = this.fromList.splice(findLargest(this.votes),1)[0].track;
			console.log('pushing!',this.userId, song.name);
			spotifyApi.addTracksToPlaylist(thiz.userId,thiz.toList.id,[song.uri]).then(song=>{
				console.log(song);
			}).catch(err=>{
				console.log('error adding',err);
			});
			setTimeout(thiz.startSong.bind(this),30000);
		}
		this.playingSong = song;
	}

	this.setChoices = function(n){
		n = n || 2;
		if(!this.fromList) return;
		this.choices = [];
		this.votes = [];
		var used = []
		for(var i = 0;i<n;i++){
			var j = Math.round(Math.random() * this.fromList.length-1)
			while(used.indexOf(j)!==-1){
				j = Math.round(Math.random() * this.fromList.length-1);
			};
			this.votes.push({idx:j,votes:0});
			used.push(j);
			this.choices.push(this.fromList[j]);
		}
	}

	this.vote = function(i){
		if(!this.votes) return;
		this.votes[i] ++;
	}

	this.setIo = function(io){
		this.io = io;
	}

	this.startSong = function(){
		var wait = this.playingSong.duration_ms - 20000;
		console.log(wait);
		this.setChoices();
		var thiz = this;
		setTimeout(this.setSong.bind(this),wait);
	}

	this.setToList = function(playlist){
		this.toList = playlist;
	}

}

function findLargest(arr){
	var most = 0;
	arr.forEach(s=>{
		if(s.votes>most){
			most = s.idx;
		}
	});
	console.log('most!!!1',most);
	return most;
}

var votingService = new VotingService();

module.exports = votingService;