import React, {Component} from 'react';
import Song from './song.component.jsx';

class Vote extends Component {
	constructor(){
		super();
		this.songs = ['Song A','Song B'];
	}

	render(){
		var votingButtons = this.songs.map((song,i)=>{
			var buttonClass = song.replace(/\s/g, '');
			return <button className={[buttonClass, 'pure-button'].join(' ')} key={i}>{song}</button>
		});

		return(
			<div>
				<h1>Vote!</h1>
				<div className="button__group">
					{ votingButtons }
				</div>
			</div>
		)
	}

}

export default Vote;
