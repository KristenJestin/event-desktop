import React, { Component } from 'react'
import '../styles/components/Calendar.scss'

import moment from '../config/LocaleMoment'
import DayNames from './DayNames'
import Week from './Week'
import Day from './Day'

// const { app } = window.require('electron').remote

class Calendar extends Component {
	constructor(props) {
		super(props)

		this.today = moment()
	}

	getFirstMondayOfWeek(date) {
		return date.clone().startOf('week')
	}
	getNumberofWeeks(date) {
		// var lastDate = date.clone().startOf('month'),
		// 	weeks = 0
		// while (lastDate.isSame(date, 'month')) {
		// 	weeks++
		// 	lastDate.add(1, 'week')
		// }

		// return weeks
		return (
			date
				.clone()
				.endOf('month')
				.endOf('week')
				.diff(date.clone().startOf('week'), 'week') + 1
		)
	}

	renderDays() {
		const selectedDate = this.props.date
		let weeks = [],
			firstDate = selectedDate.clone().startOf('month'),
			date = this.getFirstMondayOfWeek(firstDate)

		for (let week = 0; week < this.getNumberofWeeks(firstDate); week++) {
			let days = []
			for (let day = 0; day < 7; day++) {
				days.push(
					<Day
						key={day}
						date={date}
						inMonth={date.isSame(firstDate, 'month')}
						isSelected={date.isSame(selectedDate, 'day')}
						isToday={date.isSame(this.today, 'day')}
						onClick={this.props.ChangeDate}
					/>
				)

				date = date.clone().add(1, 'day')
			}
			weeks.push(<Week key={week} days={days} />)
		}

		return weeks
	}

	render() {
		return (
			<div className="Calendar">
				<DayNames />
				<div className="weeks">{this.renderDays()}</div>
			</div>
		)
	}
}

export default Calendar
