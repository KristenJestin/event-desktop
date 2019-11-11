import React, { Component } from 'react'
import '../../assets/styles/components/display/DateTimePicker.scss'

import moment from '../../config/LocaleMoment'
import Calendar from '../Calendar'
import Icon from './Icon'

class DateTimePicker extends Component {
	constructor(props) {
		super(props)

		this.state = {
			show: false,
			date: this.props.date || moment()
		}
	}

	componentWillReceiveProps(newProps) {
		if (newProps.date !== this.state.date && newProps.date != null) {
			this.setState({
				date: newProps.date
			})
		}
	}

	ChooseDate = date => {
		this.setState({
			date,
			show: false
		})
		this.props.ChooseDate(date)
	}

	show() {
		this.setState({
			show: true
		})
	}

	render() {
		return (
			!this.state.show || (
				<div className="DateTimePicker">
					<div className="container">
						<div className="chooseMonth">
							<Icon
								name="angle-left"
								classNames="change"
								props={{
									onClick: () =>
										this.setState({
											date: this.state.date
												.clone()
												.add(-1, 'month')
										})
								}}
							/>
							<span className="name">
								{this.state.date.format('MMMM YYYY')}
							</span>
							<Icon
								name="angle-right"
								classNames="change"
								props={{
									onClick: () =>
										this.setState({
											date: this.state.date
												.clone()
												.add(1, 'month')
										})
								}}
							/>
						</div>
						<div className="calendar">
							<Calendar
								selectedDate={this.state.date}
								ChangeDate={this.ChooseDate}
							/>
							<button
								className="today"
								onClick={() => this.ChooseDate(moment())}>
								Aujourd'hui
							</button>
						</div>
					</div>
				</div>
			)
		)
	}
}

export default DateTimePicker
