import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import ActionButton from '../components/ActionButton';
import MovementFigureRow from '../containers/MovementFigureRow';
import PlayerBar from '../containers/PlayerBar';

import {
  getAssignments,
  areAnyFiguresUnassigned,
  areFiguresDoubledUpIllegally,
  areAssignmentsReady,
  } from '../reducers';

import {
  movementEnd as movementEndCreator,
  } from '../actionCreators';

const MovementBoard = ({
  assignmentsReady,
  movementEnd,
  assignments,
  unassignedFigures,
  doubledUpFigures,
   }) => (
  <div>
    <PlayerBar playerId={1} />
    <MovementFigureRow playerId={1} />
    <hr />
    <MovementFigureRow playerId={2} />
    <PlayerBar playerId={2} />
    <Paper style={{ padding: 20, margin: 5 }}>
    { unassignedFigures
      && <span>Still some attackers to assign!</span> }
    { doubledUpFigures
      && <span>All defending figures must be targeted before doubling up!</span> }
    </Paper>
    { assignmentsReady
      && <ActionButton label="Proceed to attack phase" action={() => movementEnd(assignments)} /> }
  </div>
);
MovementBoard.propTypes = {
  assignmentsReady: React.PropTypes.bool.isRequired,
  movementEnd: React.PropTypes.func.isRequired,
  assignments: React.PropTypes.object.isRequired,
  unassignedFigures: React.PropTypes.bool.isRequired,
  doubledUpFigures: React.PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => (
  {
    assignments: getAssignments(state),
    assignmentsReady: areAssignmentsReady(state),
    unassignedFigures: areAnyFiguresUnassigned(state),
    doubledUpFigures: areFiguresDoubledUpIllegally(state),
  }
  );

export default connect(mapStateToProps, { movementEnd: movementEndCreator })(MovementBoard);
