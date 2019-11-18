import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../assets/styles/containers/Home.scss'

import {
	getFirstMondayOfWeekAndMonth,
	getLastSundayOfWeekAndMonth
} from '../utils/date'

import moment from '../config/LocaleMoment'
import Calendar from '../components/Calendar'
import Events from '../components/Events'
import ChooseDate from '../components/ChooseDate'
import { getRandom } from '../utils/math'

// const { app } = window.require('electron').remote

class Home extends Component {
	constructor(props) {
		super(props)

		this.state = {
			date: moment()
		}
	}

	updateEvents = date => {
		// Get all events from this month
		this.monthEvents = this.props.events
			.filter(event => {
				let start = moment(event.start)
				return (
					start.isSameOrAfter(getFirstMondayOfWeekAndMonth(date)) &&
					start.isSameOrBefore(getLastSundayOfWeekAndMonth(date))
				)
			})
			.sort((a, b) => moment(a.start).unix() - moment(b.start).unix())
		// Get all events from selected Date
		this.selectedDateEvents = this.monthEvents.filter(event =>
			moment(event.start).isSame(date, 'day')
		)
	}

	ChangeDateValue = (value, direction) => {
		const { date } = this.state
		this.ChangeDate(date.clone().add(direction, value))
	}

	ChangeDate = date => {
		this.setState(
			{
				date
			}
			// this.updateEvents(date)
		)
	}

	render() {
		// Update month and selected date events
		this.updateEvents(this.state.date)

		return (
			<div className="main-container">
				<div className="menu">
					<Events
						date={this.state.date}
						events={this.selectedDateEvents}
					/>
				</div>
				<div className="body">
					<ChooseDate
						ChangeDateValue={this.ChangeDateValue}
						date={this.state.date}
					/>
					<Calendar
						selectedDate={this.state.date}
						events={this.monthEvents}
						ChangeDate={this.ChangeDate}
					/>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		events: state.addEvent.events
	}
}

export default connect(mapStateToProps)(Home)
