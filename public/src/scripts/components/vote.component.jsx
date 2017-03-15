import React, {Component} from 'react';
import Song from './song.component.jsx';

class Vote extends Component {
	constructor(){
		super();
		this.songs = ['Song A','Song B'];
	}

	render(){
		var votingButtons = this.songs.map((song,i)=>{
			return <button className={song} key={i}>{song}</button>
		});

		return(
			<div>
				<h1>Vote!</h1>
				{ votingButtons }
			</div>
		)
	}

}

export default Vote;
