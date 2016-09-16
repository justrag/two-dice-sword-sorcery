import React from 'react';
import { connect } from 'react-redux';
import Figure from '../components/Figure';
import { getTurn, getPhase, getPlayerFigures, getFiguresById, getActivePlayer,
 getAssignedAttacks,
 getAttackSource, getSelection } from '../reducers/';
import {
 selectAttackSource as selectAttackSourceCreator,
 selectAttackTarget as selectAttackTargetCreator,
  } from '../actionCreators';

const FigureRow = ({ turn, phase, active, attackSource, selection, selectAttackSource, selectAttackTarget, figures }) => (
  <div className="figure_row" style={{ display: 'flex' }}>
    {figures.map(f => {
      let handler = () => {};
      let bulba = 'emptyhandler';
      if (turn > 0) handler = active ? selectAttackSource : selectAttackTarget;
      if (turn > 0) bulba = active ? 'selectAttackSource' : 'selectAttackTarget';
      const sel = attackSource === f.id;
      console.debug("f: %o", f); // FIXME: prepareFigures sometimes generates array with 1 undefined element
      return (
        <div key={f.id}>
          <span>{bulba}</span>
          <Figure key={f.id} sel={sel} handler={handler} {...f} />
          {(f.attackers.length !== 0) ? <span>Attackers:</span> : ''}
          { f.attackers.map(a =>
            <Figure key={a.id} sel={attackSource === a.id} handler={selectAttackSource} {...a} />)}
        </div>
        );
    })}
  </div>
  );

const amIActivePlayer =
  (state, playerId) => getActivePlayer(state) === playerId;

const prepareFigures = (state, playerId) => {
  const active = amIActivePlayer(state, playerId);
  const playerFigures = getPlayerFigures(state, playerId);
  const selection = getSelection(state);
  const allFiguresById = getFiguresById(state);

  const sources = getAssignedAttacks(state);

  return playerFigures
         .filter(pf => (!active || !sources.includes(pf.id))) // remove attacking
         .map(f => (
           { ...f,
            attackers: Object.keys(selection)
                             .filter(s => selection[s] === f.id)
                             .map(sf => allFiguresById[sf.id]),
           }
            ));
};

const mapStateToProps = (state, ownProps) => ({
  turn: getTurn(state),
  phase: getPhase(state),
  active: amIActivePlayer(state, ownProps.playerId),
  attackSource: getAttackSource(state),
  figures: prepareFigures(state, ownProps.playerId),
});

export default connect(mapStateToProps, {
  selectAttackSource: selectAttackSourceCreator,
  selectAttackTarget: selectAttackTargetCreator,
})(FigureRow);
