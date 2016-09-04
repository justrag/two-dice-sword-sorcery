import React from 'react';
import { connect } from 'react-redux';
import { getPhase, getInitRoll } from '../reducers/';
import ActionButton from '../components/ActionButton';
import InitRollDescription from '../components/InitRollDescription';
import {
  randomInit as randomInitActionCreator,
  rollForInitiative as rollForInitiativeActionCreator,
  initEnd as initEndCreator,
  } from '../actionCreators';
// import * as actions from '../actionCreators';
// const { randomInit, rollForInitiative } = actions;

const InitBoard = ({ phase, initRoll, randomInit, rollForInitiative, initEnd }) => {
  if (phase === 0) return <ActionButton label="Random Init" action={randomInit} />;
  else if (phase === 1) {
    return <ActionButton label="Roll for Initiative" action={rollForInitiative} />;
  }
  return (
    <div>
      <InitRollDescription {...initRoll} />
      <ActionButton label="Let's start!" action={initEnd} />
    </div>
    );
};
InitBoard.propTypes = {
  phase: React.PropTypes.number.isRequired,
  initRoll: React.PropTypes.object,
  randomInit: React.PropTypes.func.isRequired,
  rollForInitiative: React.PropTypes.func.isRequired,
  initEnd: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  phase: getPhase(state),
  initRoll: getInitRoll(state),
});

export default connect(mapStateToProps, {
  randomInit: randomInitActionCreator,
  rollForInitiative: rollForInitiativeActionCreator,
  initEnd: initEndCreator,
})(InitBoard);
