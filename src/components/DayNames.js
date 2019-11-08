import React, { Component } from 'react'
import '../styles/components/DayNames.scss'

import moment from '../config/LocaleMoment'

class DayNames extends Component {
	renderDayNames() {
		let dayNames = [],
			date = moment().startOf('week')

		for (let i = 0; i < 7; i++) {
			dayNames.push(
				<span key={i} className="name">
					{date.format('dddd').substring(0, 3)}
				</span>
			)
			date.add(1, 'd')
		}

		return dayNames
	}

	render() {
		return <div className="DayNames">{this.renderDayNames()}</div>
	}
}

export default DayNames
