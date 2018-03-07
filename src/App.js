import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getCanvasMousePosition } from './utils/formulas';
import Canvas from './components/Canvas';

class App extends Component {
	componentDidMount() {
		setInterval(this.handleUpdate, 10);
	}

	handleUpdate = () => {
		this.props.moveObjects(this.canvasMousePosition);
	};

	handleMouseMove = event => {
		this.canvasMousePosition = getCanvasMousePosition(event);
	};

	render() {
		return (
			<Canvas
				angle={this.props.angle}
				onMouseMove={this.handleMouseMove}
			/>
		);
	}
}

App.propTypes = {
	angle: PropTypes.number.isRequired,
	moveObjects: PropTypes.func.isRequired,
};

export default App;
