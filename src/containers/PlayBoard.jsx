import React from 'react';
import { connect } from 'react-redux';
import PhaseBar from '../components/PhaseBar';
import MovementBoard from './MovementBoard';
import AttackBoard from './AttackBoard';

import {
  getPhase,
  } from '../reducers';

const PlayBoard = ({ phase }) => {
  let board;
  if (phase === 0) board = <MovementBoard />;
  else board = <AttackBoard />;
  return (
    <div>
      <PhaseBar step={phase} />
      {board}
    </div>
  );
};
PlayBoard.propTypes = {
  phase: React.PropTypes.number.isRequired,
};

const mapStateToProps = (state) => (
  {
    phase: getPhase(state),
  }
  );

export default connect(mapStateToProps)(PlayBoard);
