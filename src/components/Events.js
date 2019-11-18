import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../assets/styles/components/Events.scss'
import colors from '../config/Colors'

import moment from '../config/LocaleMoment'

import Event from './Event'
import Modal from './display/Modal'
import Form from './display/Form'

class Events extends Component {
	addEvent = event => {
		// 2019-11-17 19:00

		let newEvent = {
			name: event.name.value,
			description: event.description.value || null,
			start: event.start.value,
			color: event.color.value
		}

		const action = { type: 'ADD_EVENT', value: newEvent }
		this.props.dispatch(action)
		this.eventModal.hide()
	}

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
							},
							start: {
								label: 'Date',
								validationRules: {
									isRequired: true
								}
							},
							color: {
								label: 'Couleurs',
								type: 'colors',
								values: [
									colors.primary,
									'#F77900',
									'#55BE30',
									'#28A0D3',
									'#8333E3'
								],
								validationRules: {
									isRequired: true
								}
							}
						}}
						submit={this.addEvent}>
						<div className="form-buttons" style={{ marginTop: 35 }}>
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
							.slice(0, 5)
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

const mapStateToProps = state => {
	return {
		allEvents: state.addEvent.events
	}
}

export default connect(mapStateToProps)(Events)
