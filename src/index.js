import React from 'react'
import ReactDOM from 'react-dom'
import './styles/base/index.scss'

import Home from './containers/Home'
import AddEvent from './containers/AddEvent'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import Store, { persistor } from './store/configure'

ReactDOM.render(
	<Provider store={Store}>
		<PersistGate persistor={persistor}>
			{/* <Router>
				<Switch>
					<Route path="/add-event">
						<AddEvent />
					</Route>
					<Route path="/">
						<Home />
					</Route>
				</Switch>
			</Router> */}
			<Home />
		</PersistGate>
	</Provider>,
	document.getElementById('root')
)
