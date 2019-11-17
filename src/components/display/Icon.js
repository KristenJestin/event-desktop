import React, { Component } from 'react'
import '../../../node_modules/@fortawesome/fontawesome-free/css/all.css'

class Icon extends Component {
	render() {
		const { brand, name, classNames, style, ...props } = this.props
		return (
			<i
				className={
					(brand || 'fas') +
					' ' +
					('fa-' + name) +
					' ' +
					(classNames || '')
				}
				style={{ ...style }}
				{...props}></i>
		)
	}
}

export default Icon
