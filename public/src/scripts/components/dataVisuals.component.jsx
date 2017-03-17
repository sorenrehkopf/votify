import React, { Component } from 'react';

import Results from './results.component.jsx';
import SVGFilter from './svgFilter.component.jsx';
import Song from './song.component.jsx';
import socket from '../services/socketService.jsx';

class DataVisuals extends Component {
	constructor(){
		super();
		this.state = {
			songs: [],
			votesA: 0,
			votesB: 0
		},
		this.svg = {
			id: '#visualization',
			width: 1000,
			height: 800,
			radius: 25,
			strength: 0.5
		}
	}

	componentWillMount() {
		var thiz = this;
		socket.on('new-vote', thiz.getVotes.bind(thiz));
		socket.on('choices', thiz.choicesUpdate.bind(thiz));
	}

	choicesUpdate(data) {
		var newChoices = data.choices.map(choice=>{
			return choice.track;
		});
		this.setState({
			songs: newChoices
		});
	}

	getVotes(data) {
		var newVotes = data.which;
		if (newVotes === '0') {
			this.state.votesA++;
			console.log('votesA: ', this.state.votesA);
		} else {
			this.state.votesB++;
			console.log('votesB: ', this.state.votesB);
		}
	}

	render() {
		var el = null;
		var songs = this.state.songs;
		var svg = this.svg;
		console.log('songs: ', songs);

		// if (songs.length === 0) {
		// 	el = (
		// 		<div className="flex flex__center">
		// 			<h2>Preparing song battle...</h2>
		// 		</div>
		// 	)
		// } else {

			var getSong = songs.map((song,i) => {
				return (
					<div className='versus' key={i}>
						<h2 className='cozy'>{ song.name }</h2>
						<p>{ song.artists[0].name }</p>
					</div>
				)
			})

			el = (
				<div>
					<h1>Fight!</h1>
					<Results
						id={ svg.id }
						width={ svg.width }
						height={ svg.height }
						radius={ svg.radius }
						strength={ svg.strength }
						voteA={ this.state.votesA }
						voteB={ this.state.votesB }
					 />
					<div className="flex versus__container">
						{ getSong[0] } <div>VS</div> { getSong[1] }
					</div>
					<SVGFilter />
				</div>
			)
		//}

		return el;
	}
}

export default DataVisuals;
