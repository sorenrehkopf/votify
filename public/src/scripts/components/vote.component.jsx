import React, {Component} from 'react';
import Song from './song.component.jsx';

import socket from '../services/socketService.jsx';

class Vote extends Component {
	constructor(){
		super();
		this.state = {
			songs:[]
		}
	}

	componentWillMount() {
		var thiz = this;
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
		var votingButtons = this.state.songs.map((song,i)=>{
			return <button className={['pure-button'].join(' ')} key={i}>{song.name}</button>
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
