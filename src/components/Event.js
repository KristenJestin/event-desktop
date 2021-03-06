import React, { Component } from 'react'
import '../assets/styles/components/Event.scss'
import colors from '../config/Colors'

import moment from '../config/LocaleMoment'
import Icon from './display/Icon'

class Event extends Component {
	render() {
		const { event } = this.props
		return (
			<div className="Event">
				<span className="times">
					{moment(event.start).format('HH:mm')}
				</span>
				<div
					className="box"
					style={{ borderLeftColor: event.color || colors.primary }}>
					<span className="text">{event.name}</span>
				</div>

				<div className="crud-icons">
					<div className="crud-icon bg-info">
						<Icon name="pen" />
					</div>
					<div className="crud-icon bg-danger">
						<Icon name="trash" />
					</div>
				</div>
			</div>
		)
	}
}

export default Event
