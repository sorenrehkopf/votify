import React, { Component } from 'react';

import Results from './results.component.jsx';
import SVGFilter from './svgFilter.component.jsx';
import Song from './song.component.jsx';
import socket from '../services/socketService.jsx';
import Http from '../services/httpService.jsx';

class DataVisuals extends Component {
	constructor(){
		super();
		this.state = {
			songs:[]
		}
	}

	componentWillMount() {
		var thiz = this;
		socket.on('choices', thiz.choicesUpdate.bind(thiz));
		Http({
			method:'GET',
			url:'/api/session/currentChoices'
		}).then(resp=>{
			console.log(resp);
			thiz.setState({
				songs:resp.data
			});
		}).catch(err=>{
			console.log(err);
		});
	}

	choicesUpdate(data) {
		var newChoices = data.choices.map(choice=>{
			return choice.track;
		});
		this.setState({
			songs: newChoices
		});
	}

	render() {
		var el = null;
		var songs = this.state.songs;
		var svg = this.svg;
		console.log('songs: ', songs);

		if (songs.length === 0) {
			el = (
				<div className="flex flex__center">
					<h2>Preparing song battle...</h2>
				</div>
			)
		} else {
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
					<Results songs={this.state.songs} />
					<div className="flex versus__container">
						{ getSong[0] } <div>VS</div> { getSong[1] }
					</div>
					<SVGFilter />
				</div>
			)
		}

		return el;
	}
}

export default DataVisuals;
