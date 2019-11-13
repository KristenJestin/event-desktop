import React, { Component } from 'react'
import '../assets/styles/components/Calendar.scss'

import { getFirstMondayOfWeek, getNumberofWeeks } from '../utils/date'

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

	renderWeeks() {
		const { selectedDate, events } = this.props

		let weeks = [],
			firstDate = selectedDate.clone().startOf('month'),
			monthDate = getFirstMondayOfWeek(firstDate)

		for (let week = 0; week < getNumberofWeeks(firstDate); week++) {
			let days = []
			for (let day = 0; day < 7; day++) {
				let date = monthDate
				days.push(
					<Day
						key={day}
						date={date}
						inMonth={date.isSame(firstDate, 'month')}
						isSelected={date.isSame(selectedDate, 'day')}
						isToday={date.isSame(this.today, 'day')}
						events={
							events != null
								? events.filter(event =>
										moment(event.start).isSame(date, 'day')
								  )
								: []
						}
						onClick={this.props.ChangeDate}
					/>
				)

				monthDate = date.clone().add(1, 'day')
			}
			weeks.push(<Week key={week} days={days} />)
		}

		return weeks
	}

	render() {
		return (
			<div className="Calendar">
				<DayNames />
				<div className="weeks">{this.renderWeeks()}</div>
			</div>
		)
	}
}

export default Calendar
