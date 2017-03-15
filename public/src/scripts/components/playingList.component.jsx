import React, {Component} from 'react';

import Http from '../services/httpService.jsx';


class PlayingList extends Component{

	constructor(){
		super();
		this.state = {
			songs:[],
			song:''
		}
		this.search;
	}

	createPlaylist(e){
		e.preventDefault();
		var thiz = this;
		var title = e.target.querySelector('[name="playlist-name"]').value;
		Http({	
			method:'POST',
			url:'/api/spotify/createPlaylist',
			data:{
				title:title,
				song:thiz.state.song
			}
		}).then(data=>{
			console.log('data',data);
			this.props.setPlayingList(data.data);
		}).catch(err=>{
			console.log('error!',err);
		})
	}

	searchSongs(e){
		if(this.search){
			clearTimeout(this.search);
		}
		var searchTerm = encodeURIComponent(e.nativeEvent.target.value);
		var thiz = this;
		this.search = setTimeout(function(){
			Http({
				method:'GET',
				url:'https://api.spotify.com/v1/search?type=track&q='+searchTerm
			},true).then(data=>{
				console.log(data.data.tracks);
				thiz.setState({
					songs:data.data.tracks.items
				});
			}).catch(err=>{console.log(err)});
		},600)
	}

	selectSong(e){
		var idx = e.nativeEvent.target.getAttribute('data-idx');
		this.setState({
			song:this.state.songs[idx].uri
		});
	}


	render(){
		var el = null;
		if(this.props.playlist){
			var src = 'https://embed.spotify.com/?uri='+this.props.playlist.uri;
			console.log(src)
			el = (
				<div>
					<h2>Currently playing:</h2>
					<iframe src={src} width="300" height="380" frameBorder="0" allowTransparency="true"></iframe>
				</div>
			)
		}else{
			var songs = this.state.songs.map((song,i)=>{
				var className = this.state.song === song.uri?'new-pl-form__song--choice selected':'new-pl-form__song--choice';
				return <p className={className} key={i} onClick={this.selectSong.bind(this)} data-idx={i}>{song.name} - {song.artists[0].name}</p>
			});
			el = (
				<div>
					<h2>Enter a name and choose a song to get the playlist started!</h2>
					<form className="new-pl-form" onSubmit={this.createPlaylist.bind(this)}>
						<label>Name: </label>
						<input type="text" name="playlist-name" required></input>
						<label>Search for a song to start the list: </label>
						<div className="new-pl-form__song">
							<input type="text" name="start-song" onInput={this.searchSongs.bind(this)} required></input>
							{songs}
						</div>
						<button>Create!</button>
					</form>
				</div>
			)
		}
		return el;
	}

}

export default PlayingList;