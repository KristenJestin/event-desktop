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

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.date !== this.state.date) {
			this.setState({ date: nextProps.date }, () =>
				setTimeout(() => {
					this.transition = false
					this.currentDate = this.state.date
					this.setState({ date: this.state.date })
					this.transition = true
				}, 200)
			)
		}
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

	getClassFromDate(date, type) {
		let value = ''
		if (date.isSame(this.state.date, type)) value = 'current'
		else if (
			!date.isBetween(
				this.state.date.clone().add(-2, type),
				this.state.date.clone().add(2, type),
				type
			)
		) {
			value = 'hide'
		}

		return value + (this.transition ? '' : ' noTransition')
	}

	getDates(type) {
		let dates = []
		for (let i = -2; i <= 2; i++) {
			dates.push(this.currentDate.clone().add(i, type))
		}
		return dates
	}

	// TODO: Add animation when changing month or year with state
	render() {
		const months = this.getDates('month'),
			years = this.getDates('year')

		return (
			<div className="ChooseDate">
				<div
					className="months multiple"
					onWheel={e =>
						this.ChangeDateValue('month', e.deltaY > 0 ? 1 : -1)
					}>
					{/* Months */}
					<span
						className={this.getClassFromDate(months[0], 'month')}
						onClick={() => this.ChangeDateValue('month', -1)}>
						{months[0].format('MMMM')}
					</span>
					<span
						className={this.getClassFromDate(months[1], 'month')}
						onClick={() => this.ChangeDateValue('month', -1)}>
						{months[1].format('MMMM')}
					</span>
					<span className={this.getClassFromDate(months[2], 'month')}>
						{months[2].format('MMMM')}
					</span>
					<span
						className={this.getClassFromDate(months[3], 'month')}
						onClick={() => this.ChangeDateValue('month', 1)}>
						{months[3].format('MMMM')}
					</span>
					<span
						className={this.getClassFromDate(months[4], 'month')}
						onClick={() => this.ChangeDateValue('month', 1)}>
						{months[4].format('MMMM')}
					</span>
					{/* End Months */}
				</div>

				<div
					className="years multiple"
					onWheel={e =>
						this.ChangeDateValue('year', e.deltaY > 0 ? 1 : -1)
					}>
					{/* Years */}
					<span
						className={this.getClassFromDate(years[0], 'year')}
						onClick={() => this.ChangeDateValue('year', -1)}>
						{years[0].format('YYYY')}
					</span>
					<span
						className={this.getClassFromDate(years[1], 'year')}
						onClick={() => this.ChangeDateValue('year', -1)}>
						{years[1].format('YYYY')}
					</span>
					<span className={this.getClassFromDate(years[2], 'year')}>
						{years[2].format('YYYY')}
					</span>
					<span
						className={this.getClassFromDate(years[3], 'year')}
						onClick={() => this.ChangeDateValue('year', 1)}>
						{years[3].format('YYYY')}
					</span>
					<span
						className={this.getClassFromDate(years[4], 'year')}
						onClick={() => this.ChangeDateValue('year', 1)}>
						{years[4].format('YYYY')}
					</span>
					{/* End Years */}
				</div>
			</div>
		)
	}
}

export default ChooseDate
