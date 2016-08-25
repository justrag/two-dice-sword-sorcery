import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AppBar from 'material-ui/AppBar';

import * as actionCreators from '../actionCreators';
import InitBoard from './InitBoard';
import PlayBoard from './PlayBoard';

export const TurnBar = ({ turn }) => (
  <AppBar
    title={<span>Turn {turn}</span>}
    iconElementLeft={<span>2d6 S&S</span>}
    iconElementRight={<span>{turn}</span>}
  />
  );
TurnBar.propTypes = { turn: React.PropTypes.number };

const Board = (props) => {
  const { turn, phase, players, sourceSelected, actions } = props;
  return (
    <div className="board">
      <TurnBar turn={turn} />
      { ((turn > 0) ? <PlayBoard {...props} /> : <InitBoard {...props} />)}
    </div>
		);
};
// Board.propTypes = { turn: React.PropTypes.number };

// function mapStateToProps(state) {
//   return {
//     players: state.game.players,
//     turn: state.game.turn,
//     phase: state.game.phase,
//     sourceSelected: state.ui.selected,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return { actions: bindActionCreators(actionCreators, dispatch) };
// }

const mapStateToProps = (state) => ({
  players: state.game.players,
  turn: state.game.turn,
  phase: state.game.phase,
  sourceSelected: state.ui.selected,
});

const mapDispatchToProps =
 (dispatch) => ({ actions: bindActionCreators(actionCreators, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(Board);
