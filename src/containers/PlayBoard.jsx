import React from 'react';
import { connect } from 'react-redux';
import Divider from 'material-ui/Divider';
import ActionButton from '../components/ActionButton';
import PhaseBar from '../components/PhaseBar';
import FigureRow from '../containers/FigureRow';

import {
  getPhase,
  getActivePlayer,
  isAttackSelectionComplete,
  } from '../reducers';

import {
  attack as attackCreator,
  } from '../actionCreators';

const PlayBoard = ({ phase, activePlayer, attack }) => (
  <div>
    <PhaseBar step={phase} />
    <h2 style={(activePlayer === 1) ? { border: 'thick solid black' } : {}}>Player 1</h2>
    <FigureRow playerId={1} />
    <Divider />
    <h2 style={(activePlayer === 2) ? { border: 'thick solid black' } : {}}>Player 2</h2>
    <FigureRow playerId={2} />
    {(phase === 0 && isAttackSelectionComplete) ? <ActionButton label="Attack!" action={attack} /> : ''}
  </div>
);

const mapStateToProps = (state) => (
  {
    phase: getPhase(state),
    activePlayer: getActivePlayer(state),
  }
  );

export default connect(mapStateToProps, { attack: attackCreator })(PlayBoard);
