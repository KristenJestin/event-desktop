import React, { Component } from 'react'
import '../styles/components/Loader.scss'

class Loader extends Component {
	renderBars() {
		let bars = []
		for (let i = 0; i < 6; i++) {
			bars.push(<div key={i} className="bar"></div>)
		}
		return bars
	}

	render() {
		return <div className="Loader">{this.renderBars()}</div>
	}
}

export default Loader
