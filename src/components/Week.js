import React, { Component } from 'react'
import '../assets/styles/components/Week.scss'

class Week extends Component {
	render() {
		const { days } = this.props
		return <div className="Week">{days}</div>
	}
}

export default Week
