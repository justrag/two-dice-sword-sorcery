import React from 'react';
import { connect } from 'react-redux';
import ActionButton from '../components/ActionButton';
import { randomInit as randomInitActionCreator } from '../actionCreators';

const InitScreen =
 ({ randomInit }) => <ActionButton label="Init Random Figures" action={randomInit} />;
InitScreen.propTypes = { randomInit: React.PropTypes.func.isRequired };

export default connect(null, {
  randomInit: randomInitActionCreator,
})(InitScreen);
