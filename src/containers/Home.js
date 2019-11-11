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
import { stringify } from 'querystring'

// const { app } = window.require('electron').remote
const { ipcRenderer } = window.require('electron')

class Home extends Component {
	constructor(props) {
		super(props)

		this.state = {
			date: moment()
		}
	}

	componentDidMount() {
		// Send to background all events
		ipcRenderer.send('events-send', this.props.events)

		// TODO: add events that must send a notification
	}

	ChangeDateValue = (value, direction) => {
		const { date } = this.state
		this.ChangeDate(date.clone().add(direction, value))
	}

	ChangeDate = date => {
		this.setState({
			date
		})
	}

	render() {
		// All events from selected month
		const monthEvents = this.props.events.filter(event => {
				let date = moment(event.start)
				return (
					date.isSameOrAfter(
						getFirstMondayOfWeekAndMonth(this.state.date)
					) &&
					date.isSameOrBefore(
						getLastSundayOfWeekAndMonth(this.state.date)
					)
				)
			}),
			// All events of the selected Date
			selectedDateEvents = monthEvents.filter(event =>
				moment(event.start).isSame(this.state.date, 'day')
			)

		return (
			<div className="main-container">
				<div className="menu">
					<Events
						date={this.state.date}
						events={selectedDateEvents}
					/>
				</div>
				<div className="body">
					<ChooseDate
						ChangeDateValue={this.ChangeDateValue}
						date={this.state.date}
					/>
					<Calendar
						selectedDate={this.state.date}
						events={monthEvents}
						ChangeDate={this.ChangeDate}
					/>
				</div>
			</div>
		)
	}
}

// Redux
const mapStateToProps = state => {
	return {
		events: state.addEvent.events
	}
}

export default connect(mapStateToProps)(Home)
