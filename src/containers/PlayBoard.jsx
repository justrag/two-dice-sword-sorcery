import React from 'react';
import { connect } from 'react-redux';
import PhaseBar from '../components/PhaseBar';
import Figure from '../components/Figure';

import { getTurn, getPhase, getFigures } from '../reducers';

const PlayBoard = ({ turn, phase, figures }) => (
  <div><h3>Turn: {turn}</h3>
    <PhaseBar step={phase} />
    <div className="figure_row" style={{ display: 'flex' }}>
    {figures.map(f => <Figure key={f.id} {...f} />)}
    </div>
  </div>
);

const mapStateToProps = (state) => (
  {
    turn: getTurn(state),
    phase: getPhase(state),
    figures: getFigures(state),
  }
  );

export default connect(mapStateToProps)(PlayBoard);
