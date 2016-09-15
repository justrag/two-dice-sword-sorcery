import React from 'react';
import { connect } from 'react-redux';
import Divider from 'material-ui/Divider';
import ActionButton from '../components/ActionButton';
import FigureRow from '../containers/FigureRow';

import {
  getPhase,
  getSelection,
  getActivePlayer,
  getActiveFiguresCount,
  getAssignedAttacksCount,
  getInactiveFiguresCount,
  getAssignedTargetsCount,
  attackDoubledUp,
  } from '../reducers';

import {
  attack as attackCreator,
  } from '../actionCreators';

const MovementBoard = ({ phase, selection, activePlayer, attack, displayAttackButton, displayAssignNotice, displayDoubleUpNotice }) => (
  <div>
    <h2 style={(activePlayer === 1) ? { border: 'thick solid black' } : {}}>Player 1</h2>
    <FigureRow playerId={1} />
    <Divider />
    <h2 style={(activePlayer === 2) ? { border: 'thick solid black' } : {}}>Player 2</h2>
    <FigureRow playerId={2} />
    { displayAttackButton ? <ActionButton label="Attack!" action={() => attack(selection)} /> : ''}
    { displayAssignNotice ? <div>Still some attackers to assign!</div> : ''}
    { displayDoubleUpNotice ? <div>All defending figures must be targeted before doubling up!</div> : ''}
  </div>
);

const allAttacksAssigned =
  (state) => (getActiveFiguresCount(state) === getAssignedAttacksCount(state));

const illegalDoublingUp = (state) =>
 (attackDoubledUp(state) && getAssignedTargetsCount(state) < getInactiveFiguresCount(state));

const attackSelectionReady = (state) =>
  (getPhase(state) === 0 && allAttacksAssigned(state) && !illegalDoublingUp(state));

const mapStateToProps = (state) => (
  {
    phase: getPhase(state),
    selection: getSelection(state),
    activePlayer: getActivePlayer(state),
    displayAttackButton: attackSelectionReady(state),
    displayAssignNotice: !allAttacksAssigned(state),
    displayDoubleUpNotice: illegalDoublingUp(state),
  }
  );

export default connect(mapStateToProps, { attack: attackCreator })(MovementBoard);