import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { getPhase, getInitRoll } from '../reducers/';
import ActionButton from '../components/ActionButton';
import PlayerBar from '../containers/PlayerBar';
import InitRollDescription from '../components/InitRollDescription';
import FigureRow from '../containers/FigureRow';

import {
  rollForInitiative as rollForInitiativeActionCreator,
  initEnd as initEndCreator,
  } from '../actionCreators';

const InitBoard =
({ phase, initRoll, rollForInitiative, initEnd }) => (
  <div className="initBoard">
    <div>
      <PlayerBar playerId={1} />
      <FigureRow playerId={1} />
      <hr />
      <FigureRow playerId={2} />
      <PlayerBar playerId={2} />
    </div>
    <div>
      { (phase === 1) ?
        <ActionButton label="Roll for Initiative" action={rollForInitiative} /> :
        <div>
          <Paper style={{ padding: 20, margin: 5 }}><InitRollDescription {...initRoll} /></Paper>
          <ActionButton label="Start turn 1" action={initEnd} />
        </div>
      }
    </div>
  </div>
  );
InitBoard.propTypes = {
  phase: React.PropTypes.number.isRequired,
  initRoll: React.PropTypes.object,
  rollForInitiative: React.PropTypes.func.isRequired,
  initEnd: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  phase: getPhase(state),
  initRoll: getInitRoll(state),
});

export default connect(mapStateToProps, {
  rollForInitiative: rollForInitiativeActionCreator,
  initEnd: initEndCreator,
})(InitBoard);
