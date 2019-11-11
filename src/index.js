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

ReactDOM.render(
	<Provider store={Store}>
		<PersistGate loading={<Loader />} persistor={persistor}>
			<Router>
				<Switch>
					<Route path="/add-event">
						<AddEvent />
					</Route>
					<Route path="/">
						<Home />
					</Route>
				</Switch>
			</Router>
		</PersistGate>
	</Provider>,

	document.getElementById('root')
)
