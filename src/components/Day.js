import React, { Component } from 'react'
import '../styles/components/Day.scss'

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
						<p key={index} style={{ color: event.color }}>
							{event.name}
						</p>
					))}
				</div>
			</div>
		)
	}
}

export default Day
