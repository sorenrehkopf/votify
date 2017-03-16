import React, { Component } from 'react';

import Results from './results.component.jsx';
import SVGFilter from './svgFilter.component.jsx';
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
		var thiz = this;
		socket.on('new-vote', function(data){ console.log('data: ', data) });
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
				<Results />
				<div className="versus__container">
					{ songs[0] } <div>VS</div> { songs[1] }
				</div>
				<SVGFilter />
			</div>
			)
	}

}

export default DataVisuals;
