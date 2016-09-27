import React from 'react';
import { connect } from 'react-redux';
import InitScreen from './InitScreen';
import InitBoard from './InitBoard';
import MovementBoard from './MovementBoard';
import AttackBoard from './AttackBoard';
import { getTurn, getPhase } from '../reducers/';
import TurnBar from '../components/TurnBar';
import PhaseBar from '../components/PhaseBar';

const Board = ({ turn, phase }) => {
  // Will probably use jsx-switch for this
  let board;
  if (turn === 0) {
    // Initial stuff
    if (phase === 0) board = <InitScreen />;
    else board = <InitBoard />;
  } else {
    // Actual game
    if (phase === 0) board = <MovementBoard />; // eslint-disable-line no-lonely-if
    else board = <AttackBoard />;
  }
  return (
    <div className="board">
      <TurnBar turn={turn} />
      {(turn > 0) && <PhaseBar step={phase} />}
      { board }
    </div>
  );
};
Board.propTypes = {
  turn: React.PropTypes.number.isRequired,
  phase: React.PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  turn: getTurn(state),
  phase: getPhase(state),
});

export default connect(mapStateToProps)(Board);
