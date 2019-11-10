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

// const { app } = window.require('electron').remote

class Home extends Component {
	constructor(props) {
		super(props)

		this.state = {
			// date: moment()
			date: moment()
		}

		this.clickTest = this.clickTest.bind(this)
		this.clickTest2 = this.clickTest2.bind(this)
	}

	ChangeDateValue = (value, direction) => {
		const { date } = this.state

		if (direction > 0) {
			date.add(direction, value)
		} else {
			date.subtract(direction * -1, value)
		}

		this.setState({
			date
		})
	}

	ChangeDate = date => {
		this.setState({
			date
		})
	}

	clickTest() {
		let event = {
			name: 'Test Event',
			description: null,
			start: moment().format('YYYY-MM-DD'),
			color: '#F77900'
		}
		const action = { type: 'ADD_EVENT', value: event }
		this.props.dispatch(action)
	}
	clickTest2() {
		const action = { type: 'CLEAR_EVENTS', value: null }
		this.props.dispatch(action)
	}

	render() {
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

					<div>
						<button onClick={this.clickTest}>Test</button>
						<button onClick={this.clickTest2}>Clear</button>
					</div>
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

const mapStateToProps = state => {
	return {
		events: state.addEvent.events
	}
}

export default connect(mapStateToProps)(Home)
