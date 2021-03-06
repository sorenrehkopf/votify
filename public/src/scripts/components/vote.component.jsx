import React, {Component} from 'react';
import Song from './song.component.jsx';
import Voted from './hasVoted.component.jsx';

import Http from '../services/httpService.jsx';
import socket from '../services/socketService.jsx';

class Vote extends Component {
	constructor(){
		super();
		this.state = {
			songs:[],
			voted:false
		}
		this.voted;
	}

	componentWillMount() {
		var thiz = this;
		socket.on('choices', thiz.choicesUpdate.bind(thiz));
		Http({
			method:'get',
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
		console.log(data);
		var newChoices = data.choices.map(choice=>{
			return choice.track;
		});
		this.setState({
			songs:newChoices
		});
	}

	vote(e){
		var thiz = this;
		if (!this.state.voted) {
			var which = e.nativeEvent.target.getAttribute('data-idx');
			socket.emit('vote',{
				which:which
			});

			thiz.setState({
				voted:true
			});
			setTimeout(function(){
				this.voted = true;
				thiz.setState({
					voted:false
				});
			},1000);
		}
	}

	render(){

		var votingButtons = this.state.songs.map((song,i)=>{
			return <button className="pure-button" key={i} disabled={this.state.voted} onClick={this.vote.bind(this)} data-idx={i}>{song.name}</button>
		});

		return(
			<div>
				<h1>Vote!</h1>
				<div className="button__group">
					{ votingButtons }
				</div>

				<Voted showMe={this.state.voted} />
			</div>
		)
	}

}

export default Vote;
