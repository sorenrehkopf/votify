import React, { Component } from 'react';

class Song extends Component {

	render(){
		return(
			<p>{this.props.songName}</p>
			)
	}

}

export default Song;
