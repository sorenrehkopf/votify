import React, { Component } from 'react';
import { render } from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

//custom components
import Main from './components/main.component.jsx';
import DataVisuals from './components/dataVisuals.component.jsx';
import Admin from './components/admin.component.jsx';
import Vote from './components/vote.component.jsx';

render(<Router history={browserHistory}>
		<Route path="/" component={Main}>
			<IndexRoute component={DataVisuals}/>
			<Route path="/vote" component={Vote} />
			<Route path="/admin" component={Admin} />
		</Route>
	</Router>, 
	document.getElementById('app')
);