import React, { Component } from 'react';

import Song from './song.component.jsx';

class DataVisuals extends Component {

	constructor(){
		super();
		this.songs = ['bohemian rhapsody','another one bites the dust'];
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