import React, { Component } from 'react'
import '../assets/styles/components/Calendar.scss'

import { getFirstMondayOfWeek, getNumberofWeeks } from '../utils/date'

import moment from '../config/LocaleMoment'
import DayNames from './DayNames'
import Week from './Week'
import Day from './Day'

class Calendar extends Component {
	constructor(props) {
		super(props)

		this.today = moment()
	}

	renderDays() {
		const { selectedDate, events } = this.props

		let weeks = [],
			firstDate = selectedDate.clone().startOf('month'),
			date = getFirstMondayOfWeek(firstDate)

		for (let week = 0; week < getNumberofWeeks(firstDate); week++) {
			let days = []
			for (let day = 0; day < 7; day++) {
				days.push(
					<Day
						key={day}
						date={date}
						inMonth={date.isSame(firstDate, 'month')}
						isSelected={date.isSame(selectedDate, 'day')}
						isToday={date.isSame(this.today, 'day')}
						events={events.filter(event =>
							moment(event.start).isSame(date, 'day')
						)}
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
