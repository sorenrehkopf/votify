import React, { Component } from 'react';

import SpotifyService from '../services/spotifyService.jsx';
import Http from '../services/httpService.jsx';

import FromList from './fromList.component.jsx';
import PlayingList from './playingList.component.jsx';

class Admin extends Component {

	constructor(){
		super()
		this.state = {
			fromList:'',
			toList:''
		};
	}

	componentWillMount(){
		var thiz = this;
		if(window.location.search){
			var token = window.location.search.replace('?auth_token=','');
			window.localStorage.setItem('auth_token',token);
			window.location.href = window.location.origin+window.location.pathname;
		}
		Http({
			method:'GET',
			url:'/api/auth/check'
		}).then(function(resp){
			console.log(resp);
			if(!resp.data) window.location.href = '/api/auth/login';
		}).catch(function(err){
			console.log(err);
		})
	}

	logout(){
		Http({
			method:'GET',
			url:'/api/auth/logout'
		}).then(function(data){
			window.localStorage.removeItem('auth_token');
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

	render(){
		return(
			<div>
				<h1>Welcome to the admin</h1>
				<button onClick={this.logout}>Log me out!</button>
				<div className="admin-controls">
					<FromList playlist={this.state.fromList} choosePlaylist={this.setFromList.bind(this)}/>
					<PlayingList playlist={this.state.playingList} setPlayingList={this.setPlayingList.bind(this)}/>
				</div>
				
			</div>
			)
	}

}

export default Admin;