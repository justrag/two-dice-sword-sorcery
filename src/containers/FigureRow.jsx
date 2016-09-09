import React from 'react';
import { connect } from 'react-redux';
import Figure from '../components/Figure';
import { getTurn, getPhase, getPlayerFigures, getActivePlayer,
 getAttackSource, getSelection } from '../reducers/';
import {
 selectAttackSource as selectAttackSourceCreator,
 selectAttackTarget as selectAttackTargetCreator,
  } from '../actionCreators';

const FigureRow = ({ turn, phase, active, attackSource, attackTarget, selectAttackSource, selectAttackTarget, figures }) => (
  <div className="figure_row" style={{ display: 'flex' }}>
    {figures.map(f => {
      const sel = active && attackSource === f.id;
      const target = attackTarget[f.id];
      const handler = (active) ? selectAttackSource : selectAttackTarget;
      return <Figure key={f.id} sel={sel} target={target} handler={handler} {...f} />;
    }
      )}
  </div>
  );

const mapStateToProps = (state, ownProps) => ({
  turn: getTurn(state),
  phase: getPhase(state),
  active: getActivePlayer(state) === ownProps.playerId,
  attackSource: getAttackSource(state),
  attackTarget: getSelection(state),
  figures: getPlayerFigures(state, ownProps.playerId),
});

export default connect(mapStateToProps, {
  selectAttackSource: selectAttackSourceCreator,
  selectAttackTarget: selectAttackTargetCreator,
})(FigureRow);
