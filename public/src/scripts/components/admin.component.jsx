import React, { Component } from 'react';

import SpotifyService from '../services/spotifyService.jsx';

class Admin extends Component {

	constructor(){
		super()
	}

	componentWillMount(){
		console.log('mounting!!');
	}

	getPlaylists(){
		SpotifyService.getPlaylists();
	}

	render(){
		return(
			<div>
				<h1>Welcome to the admin</h1>
				<a href="/api/auth/login"><button>Log me in with spotify!</button></a>
				<a href="/api/auth/logout"><button>Log me out!</button></a>
				<button onClick={this.getPlaylists}>Get playlists!</button>
				<iframe src="https://embed.spotify.com/?uri=spotify:user:122841543:playlist:1cbrPTCufxieRgxz3jLb92" width="500" height="380" frameBorder="0" allowTransparency="true"></iframe>
			</div>
			)
	}

}

export default Admin;