import React from 'react';
import { connect } from 'react-redux';
import { getPhase } from '../reducers/';
import ActionButton from '../components/ActionButton';
import {
  randomInit as randomInitActionCreator,
  rollForInitiative as rollForInitiativeActionCreator,
  } from '../actionCreators';
// import * as actions from '../actionCreators';
// const { randomInit, rollForInitiative } = actions;

const InitBoard = ({ phase, randomInit, rollForInitiative }) => (
  <div className="InitBoard">
    { (phase === 0) ?
      <ActionButton label="Random Init" action={randomInit} />
      : <ActionButton label="Roll for Initiative" action={rollForInitiative} />
    }
  </div>
  );
InitBoard.propTypes = {
  phase: React.PropTypes.number.isRequired,
  randomInit: React.PropTypes.func.isRequired,
  rollForInitiative: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  phase: getPhase(state),
});

export default connect(mapStateToProps, {
  randomInit: randomInitActionCreator,
  rollForInitiative: rollForInitiativeActionCreator,
})(InitBoard);
