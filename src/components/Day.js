import React, { Component } from 'react'
import '../styles/components/Day.scss'

class Day extends Component {
	render() {
		const { date, inMonth, isSelected, isToday, onClick } = this.props
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
			</div>
		)
	}
}

export default Day
