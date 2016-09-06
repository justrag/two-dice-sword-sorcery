import React from 'react';
import { connect } from 'react-redux';
import Divider from 'material-ui/Divider';
import { getPhase, getInitRoll, getPlayerFigures } from '../reducers/';
import ActionButton from '../components/ActionButton';
import InitRollDescription from '../components/InitRollDescription';
import FigureRow from '../components/FigureRow';

import {
  rollForInitiative as rollForInitiativeActionCreator,
  initEnd as initEndCreator,
  } from '../actionCreators';
// import * as actions from '../actionCreators';
// const { randomInit, rollForInitiative } = actions;

const InitBoard =
({ phase, initRoll, rollForInitiative, initEnd, figures1, figures2 }) => {
  let cont;
  if (phase === 1) cont = <ActionButton label="Roll for Initiative" action={rollForInitiative} />;
  else {
    cont = (
      <div>
        <InitRollDescription {...initRoll} />
        <ActionButton label="Let's start!" action={initEnd} />
      </div>
      );
  }
  return (
    <div>
      <div>
        <h2>Player 1</h2>
        <FigureRow figures={figures1} />
        <Divider />
        <h2>Player 2</h2>
        <FigureRow figures={figures2} />
      </div>
      <div>
        { cont }
      </div>
    </div>
    );
};
InitBoard.propTypes = {
  phase: React.PropTypes.number.isRequired,
  initRoll: React.PropTypes.object,
  randomInit: React.PropTypes.func.isRequired,
  rollForInitiative: React.PropTypes.func.isRequired,
  initEnd: React.PropTypes.func.isRequired,
  figures1: React.PropTypes.array,
  figures2: React.PropTypes.array,
};

const mapStateToProps = (state) => ({
  phase: getPhase(state),
  initRoll: getInitRoll(state),
  figures1: getPlayerFigures(state, 1),
  figures2: getPlayerFigures(state, 2),
});

export default connect(mapStateToProps, {
  rollForInitiative: rollForInitiativeActionCreator,
  initEnd: initEndCreator,
})(InitBoard);
