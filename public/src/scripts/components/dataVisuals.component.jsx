import React, { Component } from 'react';

import Results from './evees.component.jsx';
import SVGFilter from './svgFilter.component.jsx';
import Song from './song.component.jsx';
import socket from '../services/socketService.jsx';
import Http from '../services/httpService.jsx';

import {Link} from 'react-router';

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
					<div className="flex__col center">
						<h2>Preparing song battle...</h2>
						<Link className="pure-button" to="/vote">Vote Now</Link>
					</div>
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
					<div className="flex">
						<div className="flex__col center">
							<h1>Fight!</h1>
							<Link className="pure-button" to="/vote">Vote Now</Link>
						</div>
					</div>

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
