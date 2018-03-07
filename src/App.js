import React, { Component } from 'react';
import PropTypes from 'prop-types';

class App extends Component {
	render() {
		const { message } = this.props;
		return <div className="App">{message}</div>;
	}
}

App.propTypes = {
	message: PropTypes.string.isRequired
};

export default App;
