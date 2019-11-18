import React, { Component } from 'react'
import '../assets/styles/components/Day.scss'
import colors from '../config/Colors'

class Day extends Component {
	render() {
		const {
			date,
			inMonth,
			isSelected,
			isToday,
			events,
			onClick
		} = this.props

		return (
			<div
				className={
					'Day' +
					(inMonth ? '' : ' notSameMonth') +
					(isSelected ? ' selected' : '') +
					(isToday ? ' today' : '')
				}
				onClick={() => onClick(date)}>
				<span className="number">{date.format('DD')}</span>
				<div className="events">
					{events.map((event, index) => (
						<div
							key={index}
							className="event"
							style={{
								backgroundColor: event.color || colors.primary
							}}>
							{/* <div
								className="pastille"
								style={{ backgroundColor: event.color }}></div>
							<span className="text">{event.name}</span> */}
						</div>
					))}
				</div>
			</div>
		)
	}
}

export default Day
