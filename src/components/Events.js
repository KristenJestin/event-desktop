import React, { Component } from 'react'
import '../assets/styles/components/Events.scss'

import Event from './Event'

class Events extends Component {
	render() {
		const { events, date } = this.props
		return (
			<div className="Events">
				<span className="title">Événements</span>
				<span className="subtitle">
					{date.format('dddd DD MMMM YYYY')}
				</span>
				<div className="body">
					{events.length > 0 ? (
						events.map((event, index) => (
							<Event key={index} event={event} />
						))
					) : (
						<span className="no-event">Aucun événement</span>
					)}
				</div>
			</div>
		)
	}
}

export default Events
