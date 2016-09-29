import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import ActionButton from '../components/ActionButton';
import InitFigureRow from '../containers/InitFigureRow';
import PlayerBar from '../containers/PlayerBar';

import {
  getPhase,
  getSelection,
  getActiveFiguresCount,
  getAssignedAttacksCount,
  getInactiveFiguresCount,
  getAssignedTargetsCount,
  attackDoubledUp,
  } from '../reducers';

import {
  movementEnd as movementEndCreator,
  } from '../actionCreators';

const MovementBoard = ({
  selection,
  displayMovementEndButton,
  displayAssignNotice,
  displayDoubleUpNotice,
  movementEnd,
   }) => (
  <div>
    <PlayerBar playerId={1} />
    <InitFigureRow playerId={1} />
    <hr />
    <InitFigureRow playerId={2} />
    <PlayerBar playerId={2} />
    { displayAssignNotice
      && <Paper style={{ padding: 20, margin: 5 }}>
      Still some attackers to assign!
      </Paper> }
    { displayDoubleUpNotice
      && <Paper style={{ padding: 20, margin: 5 }}>
      All defending figures must be targeted before doubling up!
      </Paper> }
    { displayMovementEndButton
      && <ActionButton label="Proceed to attack phase" action={() => movementEnd(selection)} /> }
  </div>
);
MovementBoard.propTypes = {
  selection: React.PropTypes.object.isRequired,
  displayMovementEndButton: React.PropTypes.bool.isRequired,
  displayAssignNotice: React.PropTypes.bool.isRequired,
  displayDoubleUpNotice: React.PropTypes.bool.isRequired,
  movementEnd: React.PropTypes.func.isRequired,
};

const allAttacksAssigned =
  (state) => (getActiveFiguresCount(state) === getAssignedAttacksCount(state));

const illegalDoublingUp = (state) =>
 (attackDoubledUp(state) && getAssignedTargetsCount(state) < getInactiveFiguresCount(state));

const attackSelectionReady = (state) =>
  (getPhase(state) === 0 && allAttacksAssigned(state) && !illegalDoublingUp(state));

const mapStateToProps = (state) => (
  {
    selection: getSelection(state),
    displayMovementEndButton: attackSelectionReady(state),
    displayAssignNotice: !allAttacksAssigned(state),
    displayDoubleUpNotice: illegalDoublingUp(state),
  }
  );

export default connect(mapStateToProps, { movementEnd: movementEndCreator })(MovementBoard);
