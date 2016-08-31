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

const renderBoard = (props) => {
//  const { turn, phase, players, sourceSelected, actions } = props;
  if (props.turn > 0) {
    return <PlayBoard {...props} />;
  }
  return <InitBoard {...props} />;
};

const Board = (props) => {
  // const { turn, phase, players, figures, sourceSelected, actions } = props;
  return (
    <div className="board">
      <TurnBar turn={props.turn} />
      { renderBoard(props) }
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
  figures: state.game.figures,
  players: state.game.players,
  turn: state.game.turn,
  phase: state.game.phase,
  sourceSelected: state.ui.selected,
});

const mapDispatchToProps =
 (dispatch) => ({ actions: bindActionCreators(actionCreators, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(Board);
