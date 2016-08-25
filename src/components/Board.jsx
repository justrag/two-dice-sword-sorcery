import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actionCreators';

const Board = (props) => {
  const { turn } = props;
  return (
    <div>BULBA: {turn}</div>
		);
};

const mapStateToProps = (state) => ({
  players: state.game.players,
  turn: state.game.turn,
  phase: state.game.phase,
  sourceSelected: state.ui.selected,
});

const mapDispatchToProps =
 (dispatch) => ({ actions: bindActionCreators(actionCreators, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(Board);
