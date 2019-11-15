import React, { Component } from 'react'
import '../assets/styles/components/ChooseDate.scss'

import moment from '../config/LocaleMoment'

class ChooseDate extends Component {
	constructor(props) {
		super(props)

		this.state = {
			date: this.props.date || moment()
		}
		this.transition = true
		this.canChange = true
		this.currentDate = this.state.date

		this.getClassFromDate = this.getClassFromDate.bind(this)
	}

	ChangeDateValue = (value, direction) => {
		if (!this.canChange) return

		this.canChange = false
		const { date } = this.state
		this.setState(
			{
				date: date.clone().add(direction, value)
			},
			() =>
				setTimeout(() => {
					this.transition = false
					this.currentDate = this.state.date
					this.props.ChangeDateValue(value, direction)
					this.transition = true

					this.canChange = true
				}, 200)
		)
	}

	getClassFromDate(date) {
		let value = ''
		if (date.isSame(this.state.date, 'month')) value = 'current'
		else if (
			!date.isBetween(
				this.state.date.clone().add(-2, 'month'),
				this.state.date.clone().add(2, 'month'),
				'month'
			)
		) {
			value = 'hide'
		}

		return value + (this.transition ? '' : ' noTransition')
	}

	getDates() {
		let dates = []
		for (let i = -2; i <= 2; i++) {
			dates.push(this.currentDate.clone().add(i, 'month'))
		}
		return dates
	}

	render() {
		const { date, ChangeDateValue } = this.props
		const dates = this.getDates()
		return (
			<div className="ChooseDate">
				<div
					className="months multiple"
					onWheel={e =>
						this.ChangeDateValue('month', e.deltaY > 0 ? 1 : -1)
					}>
					{/* Months */}
					<span
						className={this.getClassFromDate(dates[0])}
						onClick={() => this.ChangeDateValue('month', -1)}>
						{dates[0].format('MMMM')}
					</span>
					<span
						className={this.getClassFromDate(dates[1])}
						onClick={() => this.ChangeDateValue('month', -1)}>
						{dates[1].format('MMMM')}
					</span>
					<span className={this.getClassFromDate(dates[2])}>
						{dates[2].format('MMMM')}
					</span>
					<span
						className={this.getClassFromDate(dates[3])}
						onClick={() => this.ChangeDateValue('month', 1)}>
						{dates[3].format('MMMM')}
					</span>
					<span
						className={this.getClassFromDate(dates[4])}
						onClick={() => this.ChangeDateValue('month', 1)}>
						{dates[4].format('MMMM')}
					</span>
					{/* End Months */}
				</div>

				<div
					className="years multiple"
					onWheel={e =>
						ChangeDateValue('year', e.deltaY > 0 ? 1 : -1)
					}>
					<span onClick={() => ChangeDateValue('year', -1)}>
						{date
							.clone()
							.subtract(1, 'year')
							.format('YYYY')}
					</span>
					<span className="current">{date.format('YYYY')}</span>
					<span onClick={() => ChangeDateValue('year', 1)}>
						{date
							.clone()
							.add(1, 'year')
							.format('YYYY')}
					</span>
				</div>
			</div>
		)
	}
}

export default ChooseDate
