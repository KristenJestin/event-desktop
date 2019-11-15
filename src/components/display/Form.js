import React, { Component } from 'react'
import validate from '../../utils/validator'
import '../../assets/styles/base/inputs.scss'
import Icon from './Icon'

class Form extends Component {
	constructor(props) {
		super(props)

		this.state = {
			controls: this.props.controls
		}

		this.handleClearForm = this.handleClearForm.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handlerChange = event => {
		const name = event.target.name
		const value = event.target.value

		const updatedControls = {
			...this.state.controls
		}
		let control = {
			...this.state.controls[name]
		}
		control.value = value
		updatedControls[name] = control
		this.setState({ controls: updatedControls })
	}

	handleBlur = event => {
		const name = event.target.name
		const value = event.target.value

		const updatedControls = {
			...this.state.controls
		}
		let control = {
			...this.state.controls[name]
		}

		if (control.validationRules != null) {
			let validation = validate(value, control.validationRules)

			control.validation = validation
		}

		updatedControls[name] = control
		this.setState({ controls: updatedControls })
	}

	// TODO: Add submit management with adding in redux, close modal, clear modal and notify
	handleSubmit(event) {
		event.preventDefault()
		console.log('submited')
		// let userData = this.state.newUser;

		// if (!event.target.checkValidity()) {

		// fetch('http://example.com',{
		// 	method: "POST",
		// 	body: JSON.stringify(userData),
		// 	headers: {
		// 	  'Accept': 'application/json',
		// 	  'Content-Type': 'application/json'
		// 	},
		//   }).then(response => {
		// 	response.json().then(data =>{
		// 	  console.log("Successful" + data);
		// 	})
		// })

		// Form submission logic
		// if (control.validationRules != null) {
		// 	let validation = validate(value, control.validationRules)
		// 	control.validation = validation
		// }

		// const data = new FormData(form);

		// for (let name of data.keys()) {
		//   const input = form.elements[name];
		//   const parserName = input.dataset.parse;

		//   if (parserName) {
		// 	const parser = inputParsers[parserName];
		// 	const parsedValue = parser(data.get(name));
		// 	data.set(name, parsedValue);
		//   }
		// }
	}
	handleClearForm() {
		// Logic for resetting the form
	}

	renderControls() {
		let controls = []
		for (let controlName in this.state.controls) {
			let control = this.state.controls[controlName]
			controls.push(
				<Input
					key={controlName}
					options={{
						name: controlName,
						label: control.label,
						value: control.value,
						validation: control.validation,
						rules: control.validationRules,
						handlerChange: this.handlerChange,
						handleBlur: this.handleBlur
					}}
				/>
			)
		}
		return controls
	}

	render() {
		return (
			<div>
				<form className="Form" onSubmit={this.handleSubmit}>
					{this.renderControls()}
					{this.props.children}
				</form>
			</div>
		)
	}
}

export default Form

{
	/* <Form
controls={{
	name: {
		label: 'Nom',
		validationRules: {
			require: true,
			isEmail: true
		}
	}
}}>
<div>test</div>
</Form> */
}

const Input = props => {
	const { options } = props || {}
	let error =
		options.validation != null && !options.validation.valid
			? options.validation.errors[0].message
			: null
	return (
		<div className="form-group">
			{!options.label || (
				<div>
					<label htmlFor={options.name || ''}>
						{options.label}
						{options.rules.isRequired || (
							<span className="notrequired"> - Optionnel</span>
						)}
					</label>
					{!error || (
						<Icon
							name="exclamation-circle"
							classNames="error-icon"
						/>
					)}
				</div>
			)}
			<input
				type={options.type || 'text'}
				id={options.name || ''}
				name={options.name || ''}
				placeholder={options.placeholder || ''}
				value={options.value || ''}
				onChange={event => options.handlerChange(event) || null}
				onBlur={event => options.handleBlur(event) || null}
			/>
			<span className="error">{error}</span>
		</div>
	)
}
