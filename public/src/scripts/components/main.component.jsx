import React, { Component } from 'react';
import { Link } from 'react-router';

class Main extends Component {
	render(){
		return(
			<div>
				<div id="app">
					{this.props.children}
				</div>
			</div>
		)
	};
};

export default Main;