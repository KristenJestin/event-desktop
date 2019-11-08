import React, { Component } from 'react'
import '../styles/views/Home.scss'

import moment from '../config/LocaleMoment'
import Calendar from '../components/Calendar'
import Events from '../components/Events'
import ChooseDate from '../components/ChooseDate'

// const { app } = window.require('electron').remote

class Home extends Component {
	constructor(props) {
		super(props)

		this.state = {
			// date: moment()
			date: moment('05/09/2019', 'DD/MM/YYYY')
		}
	}

	ChangeDate = newDate => {
		const { date } = this.state

		this.setState({
			date: newDate
		})
	}

	render() {
		return (
			<div className="main-container">
				<div className="menu">
					<Events />
				</div>
				<div className="body">
					<ChooseDate date={this.state.date} />
					<Calendar
						date={this.state.date}
						ChangeDate={this.ChangeDate}
					/>
				</div>
			</div>
		)
	}
}

export default Home
