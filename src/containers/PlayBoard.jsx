import React from 'react';
import { connect } from 'react-redux';
import Divider from 'material-ui/Divider';
import PhaseBar from '../components/PhaseBar';
import FigureRow from '../containers/FigureRow';

import {
  getPhase,
  getActivePlayer,
  } from '../reducers';

const PlayBoard = ({ phase, activePlayer }) => (
  <div>
    <PhaseBar step={phase} />
    <h2 style={(activePlayer === 1) ? { border: 'thick solid black' } : {}}>Player 1</h2>
    <FigureRow playerId={1} />
    <Divider />
    <h2 style={(activePlayer === 2) ? { border: 'thick solid black' } : {}}>Player 2</h2>
    <FigureRow playerId={2} />
  </div>
);

const mapStateToProps = (state) => (
  {
    phase: getPhase(state),
    activePlayer: getActivePlayer(state),
  }
  );

export default connect(mapStateToProps)(PlayBoard);
