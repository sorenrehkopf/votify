import React, { Component } from 'react';

import SpotifyService from '../services/spotifyService.jsx';
import Http from '../services/httpService.jsx';

class Admin extends Component {

	constructor(){
		super()
		this.state = {
			playlists :[]
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
			else{
				SpotifyService.getPlaylists().then(function(resp){
					console.log(resp.data);
					thiz.setState({playlists:resp.data.items});
					console.log(thiz.state);
				});
			}
		}).catch(function(err){
			console.log(err);
		})
	}

	getPlaylists(){
		var thiz = this;
		SpotifyService.getPlaylists().then(function(resp){
			console.log(resp.data);
			thiz.setState({playlists:resp.data.items});
			console.log(thiz.state);
		});
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

	render(){
		var playlists = this.state.playlists.map((pl,i)=>{
			return <p key={i}>{pl.name}</p>
		});
		return(
			<div>
				<h1>Welcome to the admin</h1>
				<button onClick={this.logout}>Log me out!</button>
				<button onClick={this.getPlaylists.bind(this)}>Get playlists!</button>
				{playlists}
			</div>
			)
	}

}

export default Admin;