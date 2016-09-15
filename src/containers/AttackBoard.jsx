import React from 'react';
import { connect } from 'react-redux';

import {
  getPhase,
  } from '../reducers';

const AttackBoard = ({ phase }) => (
  <div>
    Here be attacking, yarrrgh! - Phase {phase}
  </div>
  );
AttackBoard.propTypes = {
  phase: React.PropTypes.number.isRequired,
};

const mapStateToProps = (state) => (
  {
    phase: getPhase(state),
  }
  );

export default connect(mapStateToProps)(AttackBoard);
