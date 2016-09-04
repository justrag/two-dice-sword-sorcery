import React from 'react';
import { connect } from 'react-redux';
import Divider from 'material-ui/Divider';
import PhaseBar from '../components/PhaseBar';
import FigureRow from '../components/FigureRow';

import { getTurn, getPhase, getPlayerFigures } from '../reducers';

const PlayBoard = ({ turn, phase, figures1, figures2 }) => (
  <div><h3>Turn: {turn}</h3>
    <PhaseBar step={phase} />
    <h2>Player 1</h2>
    <FigureRow figures={figures1} />
    <Divider />
    <h2>Player 2</h2>
    <FigureRow figures={figures2} />
  </div>
);

const mapStateToProps = (state) => (
  {
    turn: getTurn(state),
    phase: getPhase(state),
    figures1: getPlayerFigures(state, 1),
    figures2: getPlayerFigures(state, 2),
  }
  );

export default connect(mapStateToProps)(PlayBoard);
