import React, { Component } from 'react';

import SpotifyService from '../services/spotifyService.jsx';
import Http from '../services/httpService.jsx';
import socket from '../services/socketService.jsx';

import FromList from './fromList.component.jsx';
import PlayingList from './playingList.component.jsx';

var plRefreshLink1;
var plRefreshLink2;

class Admin extends Component {

	constructor(){
		super()
		this.state = {
			playing:false
		};
	}

	componentWillMount(){
		var thiz = this;
		if(window.location.search){
			var token = window.location.search.replace('?authtoken=','');
			window.localStorage.setItem('authtoken',token);
			window.location.href = window.location.origin+window.location.pathname;
		}else{
			Http({
				method:'GET',
				url:'/api/auth/check'
			}).then(function(resp){
				console.log(resp);
				if(!resp.data) window.location.href = '/api/auth/login';
				else{
					thiz.setState({
						fromList:resp.data.fromList,
						playingList:resp.data.toList
					})
				}
			}).catch(function(err){
				console.log(err);
			})
		}
	}
	componentDidMount(){
		plRefreshLink1 = document.getElementById('playlistRefreshLink1');
		plRefreshLink2 = document.getElementById('playlistRefreshLink2');
		var thiz = this;
		socket.on('song-set',function(e){
			console.log('song socket!');
			var list = thiz.state.playingList;
			setTimeout(function(){
				thiz.setState({
					playingList:{uri:''}
				})
			},8000);
			setTimeout(function(){
				thiz.setState({
					playingList:list
				})
				plRefreshLink2.click();
			},10000);
		});
		socket.on('new-song',function(e){
			console.log('new-song!');
			setTimeout(function(){
				plRefreshLink1.click();
			},50000);
		});
	}

	logout(){
		Http({
			method:'GET',
			url:'/api/auth/logout'
		}).then(function(data){
			window.localStorage.removeItem('authtoken');
			window.location.href = '/';
		})
	}

	setFromList(e){
		var playlist = JSON.parse(e.nativeEvent.target.getAttribute('data-playlist'));
		var thiz = this;
		Http({
			method:'POST',
			url:'/api/spotify/setFromList',
			data:playlist
		}).then(data=>{
			console.log('success!');
			thiz.setState({
				fromList:playlist
			});
		}).catch(err=>{
			alert('there was an error!',err);
		});
	}

	setPlayingList(playlist){
		this.setState({
			playingList:playlist
		});
	}

	stopVoting(){
		console.log('stopping');
		var thiz = this;
		Http({
			method:'GET',
			url:'/api/session/stop'
		}).then(resp=>{
			console.log(resp);
			thiz.setState({
				playing:false
			});
		}).catch(err=>{
			console.log(err);
		});
	}

	togglePlaying(val){
		console.log(val);
		this.setState({
			playing:val
		});
	}

	render(){
		return(
			<div>
				<h1>Welcome to the admin</h1>
				<button onClick={this.logout}>Log me out!</button>
				<button onClick={this.stopVoting.bind(this)}>Stop voting!</button>
				<a id="playlistRefreshLink2" href={this.state.playingList?this.state.playingList.uri:''} ></a>
				<a id="playlistRefreshLink1" href="spotify:album:2tzbNCAUTmW4MIM2Ulvrwl" ></a>
				<div className="admin-controls">
					<FromList playlist={this.state.fromList} choosePlaylist={this.setFromList.bind(this)}/>
					<PlayingList playlist={this.state.playingList} playing={this.state.playing} togglePlaying={this.togglePlaying.bind(this)} setPlayingList={this.setPlayingList.bind(this)}/>
				</div>
				
			</div>
			)
	}

}

export default Admin;