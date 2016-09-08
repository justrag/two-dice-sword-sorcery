import React from 'react';
import { connect } from 'react-redux';
import Divider from 'material-ui/Divider';
import { getPhase, getInitRoll, getPlayerFigures, getActivePlayer } from '../reducers/';
import ActionButton from '../components/ActionButton';
import InitRollDescription from '../components/InitRollDescription';
import FigureRow from '../containers/FigureRow';

import {
  rollForInitiative as rollForInitiativeActionCreator,
  initEnd as initEndCreator,
  } from '../actionCreators';
// import * as actions from '../actionCreators';
// const { randomInit, rollForInitiative } = actions;

const InitBoard =
({ phase, initRoll, rollForInitiative, initEnd, figures1, figures2, activePlayer }) => {
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
        <h2 style={(activePlayer === 1) ? { border: 'thick solid black' } : {}}>Player 1</h2>
        <FigureRow playerId={1} />
        <Divider />
        <h2 style={(activePlayer === 2) ? { border: 'thick solid black' } : {}}>Player 2</h2>
        <FigureRow playerId={2} />
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
  rollForInitiative: React.PropTypes.func.isRequired,
  initEnd: React.PropTypes.func.isRequired,
  figures1: React.PropTypes.array,
  figures2: React.PropTypes.array,
  activePlayer: React.PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  phase: getPhase(state),
  initRoll: getInitRoll(state),
  figures1: getPlayerFigures(state, 1),
  figures2: getPlayerFigures(state, 2),
  activePlayer: getActivePlayer(state),
});

export default connect(mapStateToProps, {
  rollForInitiative: rollForInitiativeActionCreator,
  initEnd: initEndCreator,
})(InitBoard);
