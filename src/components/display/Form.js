import React, { Component } from 'react'
import validate from '../../utils/validator'
import '../../assets/styles/base/inputs.scss'
import Icon from './Icon'
import DateTimePicker from './DateTimePicker'

class Form extends Component {
	constructor(props) {
		super(props)

		this.state = {
			controls: this.props.controls
		}

		this.clear = this.clear.bind(this)
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
		this.props.submit(this.state.controls)
	}
	clear() {
		// TODO: add logic for resetting the form
	}

	renderControls() {
		let controls = []
		for (let controlName in this.state.controls) {
			let control = this.state.controls[controlName]

			let input = null
			switch (control.type) {
				case 'date':
					input = (
						<DateInput
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
					break

				case 'colors':
					input = (
						<ColorsInput
							key={controlName}
							options={{
								name: controlName,
								label: control.label,
								value: control.value || control.values[0],
								colors: control.values,
								validation: control.validation,
								rules: control.validationRules,
								handlerChange: this.handlerChange,
								handleBlur: this.handleBlur
							}}
						/>
					)
					break

				default:
					input = (
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
			controls.push(input)
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

const DateInput = props => {
	const { options } = props || {}
	let error =
		options.validation != null && !options.validation.valid
			? options.validation.errors[0].message
			: null

	let datepicker, input
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
				ref={ref => (input = ref)}
				type={options.type || 'text'}
				id={options.name || ''}
				name={options.name || ''}
				placeholder={options.placeholder || ''}
				value={options.value || ''}
				onClick={() => datepicker.show()}
				onChange={event => options.handlerChange(event) || null}
				onBlur={event => options.handleBlur(event) || null}
			/>
			<span className="error">{error}</span>
			<DateTimePicker
				ref={ref => (datepicker = ref)}
				ChooseDate={date =>
					(input.value = date.format('YYYY-MM-DD HH:mm'))
				}
			/>
		</div>
	)
}

const ColorsInput = props => {
	const { options } = props || {}
	let error =
		options.validation != null && !options.validation.valid
			? options.validation.errors[0].message
			: null

	let input
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
				ref={ref => (input = ref)}
				type="hidden"
				name={options.name || ''}
				value={options.value || ''}
				onChange={event => alert('') || null}
			/>
			<div className="colors">
				{options.colors.map((color, index) => (
					<div
						key={index}
						className={
							'color' +
							(options.value === color ? ' selected' : '')
						}
						style={{ backgroundColor: color }}
						onClick={() =>
							options.handlerChange({
								target: { value: color, name: options.name }
							})
						}></div>
				))}
			</div>
			<span className="error">{error}</span>
		</div>
	)
}
