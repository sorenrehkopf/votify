import React, { Component } from 'react';

import Song from './song.component.jsx';
import socket from '../services/socketService.jsx';

class DataVisuals extends Component {
	constructor(){
		super();
		this.state = {
			songs:[]
		}
	}

	componentWillMount() {
<<<<<<< HEAD
		socket.on('new-vote', function(data){ console.log('data: ', data) });
		socket.on('choices', function(data){ console.log('data: ', data) });
=======
		var thiz = this;
		socket.on('vote', function(data){ console.log('data: ', data) });
		socket.on('choices', thiz.choicesUpdate.bind(thiz));
	}

	choicesUpdate(data) {
		console.log(data);
		var newChoices = data.choices.map(choice=>{
			return choice.track;
		});
		this.setState({
			songs:newChoices
		});
>>>>>>> 359aa25aeaf23a1a4ab6b136de5da0a660ef11b5
	}

	render(){
		var vs = <span>VS</span>;
		var songs = this.state.songs.map((song,i)=>{
			return (
				<div className='versus' key={i}>
					<h2 className='cozy'>{ song.name }</h2>
					<p>{ song.artists[0].name }</p>
				</div>
			)
		});

		return(
			<div>
				<h1>Fight!</h1>
				<div className="versus__container">
					{ songs[0] } <div>VS</div> { songs[1] }
				</div>
			</div>
			)
	}

}

export default DataVisuals;
