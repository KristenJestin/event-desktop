import React from 'react'
import ReactDOM from 'react-dom'
import './assets/styles/base/index.scss'

import Home from './containers/Home'
import AddEvent from './containers/AddEvent'
import Loader from './components/display/Loader'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import Store, { persistor } from './store/configure'

import ReactNotifications from 'react-notifications-component'

// const { app } = window.require('electron').remote

ReactDOM.render(
	<Provider store={Store}>
		<PersistGate loading={<Loader />} persistor={persistor}>
			<ReactNotifications />
			<Router>
				<Switch>
					<Route path="/">
						<Home />
					</Route>
					<Route path="/add-event">
						<AddEvent />
					</Route>
				</Switch>
			</Router>
		</PersistGate>
	</Provider>,
	document.getElementById('root')
)
