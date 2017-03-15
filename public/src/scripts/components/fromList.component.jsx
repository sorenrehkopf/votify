import React, {Component} from 'react';

import SpotifyService from '../services/spotifyService.jsx';


class FromList extends Component{
	
	constructor(props){
		super(props);
		this.state = {
			playlists:[]
		}
	}

	componentWillMount(){
		var thiz = this;
		SpotifyService.getPlaylists().then(function(resp){
			thiz.setState({playlists:resp.data.items});
			console.log(thiz.state);
		});
	}

	render(){
		var playlists = this.state.playlists.map((pl,i)=>{
			let plInfo = JSON.stringify(pl);
			return <h3 key={i} onClick={this.props.choosePlaylist} data-playlist={plInfo}>{pl.name}</h3>
		});

		var el = null;
		if(!this.props.playlist){
			el = (
				<div>
					<h2>Choose a list to pull songs from!</h2>
					{playlists}
				</div>
			);
		}else{
			el = (
				<div>
					<h2>Currently pulling songs from: </h2>
					<h3>{this.props.playlist.name}</h3>
				</div>
			);
		}
			
		return(el);
	}

}

export default FromList;