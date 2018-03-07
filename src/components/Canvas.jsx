import React from 'react';
import PropTypes from 'prop-types';

import Sky from './Sky';
import Ground from './Ground';
import Cannon from './Cannon';

const Canvas = ({ angle, onMouseMove }) => {
	const viewBox = [
		window.innerWidth / -2,
		100 - window.innerHeight,
		window.innerWidth,
		window.innerHeight,
	];

	return (
		<svg
			id="die-aliens-die-canvas"
			preserveAspectRatio="xMaxYMax none"
			onMouseMove={onMouseMove}
			viewBox={viewBox}
		>
			<Sky />
			<Ground />
			<Cannon rotation={angle} />
		</svg>
	);
};

Canvas.propTypes = {
	angle: PropTypes.number.isRequired,
	onMouseMove: PropTypes.func.isRequired,
};

export default Canvas;
