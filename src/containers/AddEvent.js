import React, { Component } from 'react'
import logo from '../assets/logo.svg'
import '../assets/styles/containers/AddEvent.css'

const { app } = window.require('electron').remote

class AddEvent extends Component {
	render() {
		return (
			<div className="AddEvent">
				<div className="AddEvent-header">
					<img src={logo} className="AddEvent-logo" alt="logo" />
					<h2>Ajouter un Évenement</h2>
				</div>
				<p className="AddEvent-intro">
					<b> Release 0.2.7 </b>
					Version: {app.getVersion()}
				</p>
			</div>
		)
	}
}

export default AddEvent
