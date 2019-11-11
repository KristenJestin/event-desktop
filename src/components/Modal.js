import React, { Component } from 'react'
import '../assets/styles/components/Modal.scss'
import '../assets/styles/base/input.scss'

import Icon from './Icon'

class Modal extends Component {
	constructor(props) {
		super(props)

		this.state = {
			show: this.props.show || false,
			isChecked: false
		}
	}

	show() {
		this.setState({
			show: true
		})
	}

	hide = event => {
		event.preventDefault()
		if (event.target === event.currentTarget) {
			this.setState({
				show: false
			})
		}
	}

	render() {
		return (
			<div
				className={'Modal' + (this.state.show ? ' show' : ' hide')}
				onClick={event => this.hide(event)}>
				<div className="content">
					<div className="header">Modification de l'événement</div>
					<div className="body">
						{/* Le Lorem Ipsum est simplement du faux texte employé dans
						la composition et la mise en page avant impression. Le
						Lorem Ipsum est le faux texte standard de l'imprimerie
						depuis les années 1500, quand un imprimeur anonyme
						assembla ensemble des morceaux de texte pour réaliser un
						livre spécimen de polices de texte. Il n'a pas fait que
						survivre cinq siècles, mais s'est aussi adapté à la
						bureautique informatique, sans que son contenu n'en soit
						modifié. Il a été popularisé dans les années 1960 grâce
						à la vente de feuilles Letraset contenant des passages
						du Lorem Ipsum, et, plus récemment, par son inclusion
						dans des applications de mise en page de texte, comme
						Aldus PageMaker. */}

						<div style={{ marginTop: 100 }}>
							<div className="form-group">
								<label htmlFor="name">
									Nom
									<Icon
										name="asterisk"
										classNames="required"
									/>
								</label>
								<input
									type="text"
									id="name"
									placeholder="Ajouter le nom de l'événement"
									name="name"
									required
								/>
							</div>

							<div className="form-group">
								<label htmlFor="desc">
									Nom
									<Icon
										name="asterisk"
										classNames="required"
									/>
								</label>
								<input
									type="text"
									id="desc"
									placeholder="Ajouter le nom de l'événement"
									name="desc"
									required
								/>
							</div>

							<div className="form-group form-check">
								<input
									type="checkbox"
									className="checkbox"
									onChange={() => null}
									checked={this.state.isChecked}
								/>
								<Icon name="check" classNames="checkmark" />
								<label
									onClick={() => {
										this.setState({
											isChecked: !this.state.isChecked
										})
									}}>
									Black
									<Icon
										name="asterisk"
										classNames="required"
									/>
								</label>
							</div>
							<div className="form-group">
								<button>Enregistrer</button>
							</div>
						</div>
					</div>
					<div className="footer">
						<button>Valider</button>
					</div>
				</div>
			</div>
		)
	}
}

export default Modal
