function VotingService(){

	this.setFromList = function(playlist){
		console.log('setting from',playlist);
		this.fromList = playlist;

	}

	this.setSong = function(config){
		if(config){
			this.api = config.api;
			this.userId = config.userId;
		}
		if(!this.api) return;
		console.log(config);
		var thiz = this;
		var song = config.song || this.fromList.splice(findLargest(this.votes),1)[0];
		this.playingSong = song;
		if(!config){
			setTimeout(thiz.startSong,30000);
		}
		console.log(this.api.addTracksToPlaylist);
		return(this.api.addTracksToPlaylist(thiz.userId,thiz.toList.id,[song.uri]));
	}

	this.setChoices = function(n){
		n = n || 2;
		if(!this.fromList) return;
		this.choices = [];
		this.votes = [];
		var used = []
		for(var i = 0;i<n;i++){
			var j = Math.round(Math.random() * this.fromList.length-2)
			while(used.indexOf(j)!==-1){
				j = Math.round(Math.random() * this.fromList.length-2);
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
		var wait = this.playingSong.duration_ms - 30000;
		console.log(wait);
		this.setChoices();
		setTimeout(this.setSong,wait)
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
	return most;
}

var votingService = new VotingService();

module.exports = votingService;