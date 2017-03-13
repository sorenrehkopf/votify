import React, { Component } from 'react';

class Admin extends Component {

	constructor(){
		super()
	}

	componentWillMount(){
		console.log('mounting!!');
	}

	render(){
		return(
			<div>
				<h1>Welcome to the admin</h1>
				
				<iframe src="https://embed.spotify.com/?uri=spotify:user:122841543:playlist:1cbrPTCufxieRgxz3jLb92" width="500" height="380" frameBorder="0" allowTransparency="true"></iframe>
			</div>
			)
	}

}

export default Admin;