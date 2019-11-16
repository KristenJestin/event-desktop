import React, { Component } from 'react'
import '../assets/styles/components/Events.scss'

import moment from '../config/LocaleMoment'

import Event from './Event'
import Modal from './display/Modal'
import Form from './display/Form'

class Events extends Component {
	renderModal() {
		return (
			<Modal ref={ref => (this.eventModal = ref)}>
				<div className="header">Ajout d'un événement</div>
				<div className="body">
					<Form
						controls={{
							// TODO: Add all the other controls
							name: {
								label: 'Nom',
								validationRules: {
									isRequired: true
								}
							},
							description: {
								label: 'Description',
								validationRules: {}
							}
						}}>
						<div className="form-buttons">
							<button
								type="button"
								className="only-text"
								style={{ paddingLeft: 30, paddingRight: 30 }}
								onClick={() => this.eventModal.hide()}>
								Annuler
							</button>
							<button type="submit">Ajouter l'événement</button>
						</div>
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
						events
							.sort(
								(a, b) =>
									moment(a.start).unix() -
									moment(b.start).unix()
							)
							.map((event, index) => (
								<Event key={index} event={event} />
							))
					) : (
						<span className="no-event">Aucun événement</span>
					)}
				</div>
				<div className="footer">
					<button onClick={() => this.eventModal.show()}>
						Ajouter un Événement
					</button>
				</div>
				{this.renderModal()}
			</div>
		)
	}
}

export default Events
