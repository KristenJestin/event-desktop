import React, { Component } from 'react'
import '../styles/components/ChooseDate.scss'

class ChooseDate extends Component {
	render() {
		const { date } = this.props
		return (
			<div className="ChooseDate">
				<span>{date.format('MMMM YYYY')}</span>
			</div>
		)
	}
}

export default ChooseDate
