import React, { Component } from 'react';
import { Link } from 'react-router';

class Main extends Component {
	render(){
		return(
			<main>
				{this.props.children}
			</main>
		)
	};
};

export default Main;
