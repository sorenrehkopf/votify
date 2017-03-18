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
			console.log(findLargest(this.votes));
			var song = this.fromList.splice(findLargest(this.votes),1)[0].track;
			console.log('pushing!');
			spotifyApi.addTracksToPlaylist(thiz.userId,thiz.toList.id,[song.uri]).then(song=>{
				console.log(song);
			}).catch(err=>{
				console.log('error adding',err);
			});
			if(!this.stopped) this.startSongTimer = setTimeout(thiz.startSong.bind(this),30000);
		}
		if(this.nio) this.nio.emit('song-set',{});
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
		var feChoices = this.choices.map(c=>{
			c.score = 0;
			return c;
		});
		this.nio.emit('choices',{choices:feChoices})
	}

	this.vote = function(i){
		if(!this.votes) return;
		this.votes[i].votes ++;
	}

	this.setIo = function(io){
		this.io = io;
	}

	this.startSong = function(nio){
		if(nio) this.nio = nio;
		var wait = this.playingSong.duration_ms - (this.playingSong.duration_ms - 10000);
		console.log(wait);
		this.setChoices();
		var thiz = this;
		this.nio.emit('new-song',{choices:thiz.choices});
		this.upNextTimer = setTimeout(this.setSong.bind(this),wait);
	}

	this.stop = function(){
		clearTimeout(this.upNextTimer);
		clearTimeout(this.startSongTimer);
		this.toList = null;
	}

	this.setToList = function(playlist){
		this.toList = playlist;
	}

}

function findLargest(arr){
	var most = arr[0].idx;
	arr.forEach(s=>{
		if(s.votes>most){
			most = s.idx;
		}
	});
	return most;
}

var votingService = new VotingService();

module.exports = votingService;
