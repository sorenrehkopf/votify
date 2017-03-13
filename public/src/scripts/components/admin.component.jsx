import React, { Component } from 'react';

class Admin extends Component {

	constructor(){
		super()
		this.hello = "hello hey wow!";
		this.things = ['hey!','hello!','wow'];
	}

	componentWillMount(){
		console.log('mounting!!');
	}

	render(){
		var things = this.things.map((thing,i)=>{
			return(
				<h3 key={i}>{thing}</h3>
				)
		})
		return(
			<div id="admin!">
				<h1>Welcome to the admin</h1>
				{things}
			</div>
			)
	}

}

export default Admin;