import React from 'react';
import { connect } from 'react-redux';
import InitBoard from './InitBoard';
import PlayBoard from './PlayBoard';
import InitScreen from './InitScreen';
import { getTurn, getPhase } from '../reducers/';
import TurnBar from '../components/TurnBar';

const Board = ({ turn, phase }) => {
  let board;
  if (turn === 0 && phase === 0) board = <InitScreen />;
  else if (turn > 0) board = <PlayBoard />;
  else board = <InitBoard />;
  return (
    <div className="board">
      <TurnBar turn={turn} />
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
