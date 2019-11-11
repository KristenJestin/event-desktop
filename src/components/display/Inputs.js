import React, { Component } from 'react'
import validate from '../../utils/validator'
import '../../assets/styles/base/inputs.scss'

export const TextInput = props => {
	let options = props.options || {}
	return (
		<div className="form-group">
			{options.label ? (
				<label htmlFor={options.name || ''}>{options.label}</label>
			) : null}
			<input
				type={options.type || 'text'}
				id={options.name || ''}
				name={options.name || ''}
				placeholder={options.placeholder || ''}
				value={options.value || ''}
				onChange={event => options.changeHandler(event) || null}
			/>
			<span className="error">
				{options.validation != null && !options.validation.valid
					? options.validation.errors[0].message
					: ''}
			</span>
		</div>
	)
}

class Form extends Component {
	constructor(props) {
		super(props)

		this.state = {
			controls: this.props.controls
		}
	}

	changeHandler = event => {
		const name = event.target.name
		const value = event.target.value

		const updatedControls = {
			...this.state.controls
		}
		let control = {
			...this.state.controls[name]
		}

		control.value = value
		if (control.validationRules != null) {
			let validation = validate(value, control.validationRules)

			control.validation = validation
		}

		updatedControls[name] = control
		this.setState({ controls: updatedControls })

		// if (control.onChange != null) {
		// 	control.onChange(event)
		// }
	}

	renderControls() {
		let controls = []
		for (let controlName in this.state.controls) {
			let control = this.state.controls[controlName]
			controls.push(
				<TextInput
					key={control}
					options={{
						name: controlName,
						label: control.label,
						value: control.value,
						validation: control.validation,
						changeHandler: this.changeHandler
					}}
				/>
			)
		}
		return controls
	}

	render() {
		return <div className="Form">{this.renderControls()}</div>
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
