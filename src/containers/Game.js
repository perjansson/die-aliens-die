import { connect } from 'react-redux';

import { moveObjects } from '../actions';
import App from '../App';

const mapStateToProps = state => ({
	angle: state.angle,
});

const mapDispatchToProps = dispatch => ({
	moveObjects: mousePosition => dispatch(moveObjects(mousePosition)),
});

const Game = connect(mapStateToProps, mapDispatchToProps)(App);

export default Game;
