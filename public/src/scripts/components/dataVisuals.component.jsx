import React, { Component } from 'react';

import Song from './song.component.jsx';
import socket from '../services/socketService.jsx';

class DataVisuals extends Component {

	constructor(){
		super();
		this.songs = ['bohemian rhapsody','another one bites the dust'];
	}

	componentWillMount() {
		socket.on('vote', function(data){ console.log('data: ', data) });
		socket.on('choices', function(data){ console.log('data: ', data) });
	}

	render(){
		var songs = this.songs.map((song,i)=>{
			return <Song songName={song} key={i} />
		})
		return(
			<div>
			<h1>Welcome to the data visualization</h1>
			{songs}
			</div>
			)
	}

}

export default DataVisuals;
