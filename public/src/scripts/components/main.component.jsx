import React, { Component } from 'react';

import io from 'socket.io-client';

const socket = io("http://localhost:3000/");

class Main extends Component {

	constructor(){
		super();
		this.num = 0;
		this.onOrOff = 'on';
	}

	componentDidMount(){
		var thiz = this;
		socket.on('hey',thiz.increment.bind(thiz))
	}

	increment(){
		this.num ++;
		this.forceUpdate();
	}

	emit(){
		var thiz = this;
		socket.emit(thiz.onOrOff);
		this.onOrOff = this.onOrOff === 'on'?'off':'on';
	}

	render(){
		return(
				<div>
					<h1>Hello!</h1>
					<h1>{this.num}</h1>
					<button onClick={this.emit.bind(this)}>Light Switch</button>
				</div>
			)
	}

}

export default Main;