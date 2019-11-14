import React, { Component } from 'react'
import '../../assets/styles/components/display/Modal.scss'
import Icon from './Icon'

class Modal extends Component {
	constructor(props) {
		super(props)

		this.state = {
			show: this.props.show || false
		}

		this.show = this.show.bind(this)
		this.hide = this.hide.bind(this)
		this.hideOnClickOutside = this.hideOnClickOutside.bind(this)
	}

	show() {
		this.setState({
			show: true
		})
	}

	hide() {
		this.setState({
			show: false
		})
	}
	hideOnClickOutside(event) {
		if (event.target === event.currentTarget) {
			event.preventDefault()
			this.hide()
		}
	}

	render() {
		return (
			<div
				className={'Modal' + (this.state.show ? ' show' : ' hide')}
				onClick={this.hideOnClickOutside}>
				<div className="content">
					<div className="close">
						<Icon name="times" onClick={this.hide} />
					</div>
					{this.props.children}
				</div>
			</div>
		)
	}
}

export default Modal
