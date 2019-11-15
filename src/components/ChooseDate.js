import React, { Component } from 'react'
import '../assets/styles/components/ChooseDate.scss'

import moment from '../config/LocaleMoment'

class ChooseDate extends Component {
	constructor(props) {
		super(props)

		this.state = {
			date: this.props.date || moment()
		}
		this.currentDate = this.state.date

		this.getClassFromDate = this.getClassFromDate.bind(this)
	}

	componentDidUpdate(oldProps) {
		const newProps = this.props
		if (!oldProps.date.isSame(newProps.date, 'month')) {
			this.setState({ date: newProps.date })
			this.currentDate = newProps.date
		}
	}

	ChangeDateValue = (direction, value) => {
		const { date } = this.state
		this.setState(
			{
				date: date.clone().add(direction, value)
			},
			() =>
				setTimeout(() => {
					this.currentDate = this.state.date
					this.props.ChangeDateValue(value, direction)
				}, 1000)
		)
	}

	getClassFromDate(date) {
		if (date.isSame(this.state.date, 'month')) return 'current'
		else if (
			!date.isBetween(
				this.state.date.clone().add(-2, 'month'),
				this.state.date.clone().add(2, 'month'),
				'month'
			)
		) {
			return 'hide'
		}
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
						ChangeDateValue('month', e.deltaY > 0 ? 1 : -1)
					}>
					{/* Months */}
					<span
						className={this.getClassFromDate(dates[0])}
						onClick={() => this.ChangeDateValue(-1, 'month')}>
						{dates[0].format('MMMM')}
					</span>
					<span
						className={this.getClassFromDate(dates[1])}
						onClick={() => this.ChangeDateValue(-1, 'month')}>
						{dates[1].format('MMMM')}
					</span>
					<span className={this.getClassFromDate(dates[2])}>
						{dates[2].format('MMMM')}
					</span>
					<span
						className={this.getClassFromDate(dates[3])}
						onClick={() => this.ChangeDateValue(1, 'month')}>
						{dates[3].format('MMMM')}
					</span>
					<span
						className={this.getClassFromDate(dates[4])}
						onClick={() => this.ChangeDateValue(1, 'month')}>
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
