import React from 'react'
import ReactDOM from 'react-dom'
import './styles/base/index.scss'

import Home from './views/Home'
import AddEvent from './views/AddEvent'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

ReactDOM.render(
	<Router>
		<Switch>
			<Route path="/add-event">
				<AddEvent />
			</Route>
			<Route path="/">
				<Home />
			</Route>
		</Switch>
	</Router>,
	document.getElementById('root')
)
