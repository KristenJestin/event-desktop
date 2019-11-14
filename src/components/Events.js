import React, { Component } from 'react'
import '../assets/styles/components/Events.scss'

import Event from './Event'
import Modal from './display/Modal'
import Form from './display/Form'

class Events extends Component {
	renderModal() {
		return (
			<Modal ref={ref => (this.newEventModal = ref)}>
				<div className="header">Ajout d'un événement</div>
				<div className="body">
					<Form
						controls={{
							// TODO: Add all the other controls
							name: {
								label: 'Nom',
								validationRules: {
									require: true,
									isEmail: true
								}
							}
						}}>
						<button type="submit">Valider</button>
					</Form>
				</div>
			</Modal>
		)
	}

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
				<div className="footer">
					<button onClick={() => this.newEventModal.show()}>
						Ajouter un Événement
					</button>
				</div>
				{this.renderModal()}
			</div>
		)
	}
}

export default Events
