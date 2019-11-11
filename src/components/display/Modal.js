import React, { Component } from 'react'
import '../../assets/styles/components/display/Modal.scss'

class Modal extends Component {
	constructor(props) {
		super(props)

		this.state = {
			show: this.props.show || false
		}
	}

	show() {
		this.setState({
			show: true
		})
	}

	hide = () => {
		this.setState({
			show: false
		})
	}
	hideOnClickOutside = event => {
		event.preventDefault()
		if (event.target === event.currentTarget) {
			this.hide()
		}
	}

	render() {
		return (
			<div
				className={'Modal' + (this.state.show ? ' show' : ' hide')}
				onClick={event => this.hideOnClickOutside(event)}>
				<div className="content">
					<div className="header">Modification de l'événement</div>
					<div className="body">
						Le Lorem Ipsum est simplement du faux texte employé dans
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
						Aldus PageMaker.
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
