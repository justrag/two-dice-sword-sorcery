import React from 'react';
import { connect } from 'react-redux';
import Figure from '../components/Figure';
import { getTurn, getPhase, getPlayerFigures, getFiguresById,
 getAssignedAttacks,
 getAttackSource, getSelection,
 getAttackFigure, getClassOrder,
 isPlayerActive } from '../reducers/';
import {
 selectAttackSource as selectAttackSourceCreator,
 selectAttackTarget as selectAttackTargetCreator,
 selectCurrent as selectCurrentCreator,
  } from '../actionCreators';

const FigureRow = ({ turn, phase, active,
  attackSource, selectAttackSource, selectAttackTarget,
  figures, upOrDown,
  classOrder, selectCurrent, attackFigure }) => (
  <div className="figure_row" style={{ color: upOrDown ? 'red' : 'green', display: 'flex' }}>
    {figures.map(f => {
      let handler = () => {};
      let sel;
      if (turn > 0 && phase === 0) {
        sel = attackSource === f.id;
        if (active) handler = selectAttackSource;
        if (!active && attackSource) handler = selectAttackTarget;
      }
      if (turn > 0 && phase === 1) {
        sel = attackFigure === f.id;
        if (classOrder === 0 && f.chclass === 'Caster' && !f.activated) handler = selectCurrent;
      }
      return (
        <div
          key={f.id}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: (upOrDown) ? 'flex-start' : 'flex-end' }}
        >
          <div style={{ order: 2 }} >
            <Figure key={f.id} sel={sel} handler={handler} {...f} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', order: (upOrDown ? 3 : 1) }} >
            <div style={{ order: (upOrDown ? 1 : 3) }} >
              {(f.attackers.length === 0) ? '' : (upOrDown ? '↑' : '↓')}
            </div>
            <div style={{ order: 2 }}>
              { f.attackers.map(a => {
                let asel = false;
                let ahandler = (arg) => { console.log(classOrder, a.chclass, arg); };
                if (phase === 0) {
                  asel = attackSource === a.id;
                  ahandler = selectAttackSource;
                } else if (phase === 1) {
                  asel = attackFigure === a.id;
                  if (((classOrder === 0 && a.chclass === 'Caster') ||
                         (classOrder === 1 && a.chclass === 'Missile') ||
                         (classOrder === 2 && a.chclass === 'Melee'))
                          && !a.activated) ahandler = selectCurrent;
                }
                return <Figure key={a.id} sel={asel} handler={ahandler} {...a} />;
              })}
            </div>
          </div>
        </div>
        );
    })}
  </div>
  );

const prepareFigures = (state, playerId) => {
  const active = isPlayerActive(state, playerId);
  const playerFigures = getPlayerFigures(state, playerId);
  const selection = getSelection(state);
  const allFiguresById = getFiguresById(state);

  const sources = getAssignedAttacks(state);

  return playerFigures
         .filter(pf => (!active || !sources.includes(String(pf.id))))
         .map(f => (
           { ...f,
            attackers: Object.keys(selection)
                            .reduce((atkArr, s) => {
                              if (selection[s] === f.id) {
                                atkArr.push(allFiguresById[s]);
                              }
                              return atkArr;
                            }, []),
           }
            ));
};

const mapStateToProps = (state, ownProps) => ({
  turn: getTurn(state),
  phase: getPhase(state),
  active: isPlayerActive(state, ownProps.playerId),
  attackSource: getAttackSource(state),
  figures: prepareFigures(state, ownProps.playerId),
  upOrDown: ownProps.playerId === 1,
  attackFigure: getAttackFigure(state),
  classOrder: getClassOrder(state),
});

export default connect(mapStateToProps, {
  selectAttackSource: selectAttackSourceCreator,
  selectAttackTarget: selectAttackTargetCreator,
  selectCurrent: selectCurrentCreator,
})(FigureRow);
