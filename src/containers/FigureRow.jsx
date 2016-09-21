import React from 'react';
import { connect } from 'react-redux';
import UpArrow from 'material-ui/svg-icons/action/open-with';
import Figure from '../components/Figure';
import { getTurn, getPhase, getPlayerFigures, getFiguresById, getActivePlayer,
 getAssignedAttacks,
 getAttackSource, getSelection } from '../reducers/';
import {
 selectAttackSource as selectAttackSourceCreator,
 selectAttackTarget as selectAttackTargetCreator,
  } from '../actionCreators';

const FigureRow = ({ turn, phase, active, attackSource, selection, selectAttackSource, selectAttackTarget, figures, upOrDown }) => (
  <div className="figure_row" style={{ color: upOrDown ? 'red' : 'green', display: 'flex' }}>
    {figures.map(f => {
      let handler = () => {};
      if (turn > 0) {
        if (active) handler = selectAttackSource;
        if (!active && attackSource) handler = selectAttackTarget;
      }
      const sel = attackSource === f.id;
      return (
        <div key={f.id} style={{ display: 'flex', flexDirection: 'column', justifyContent: (upOrDown) ? 'flex-start' : 'flex-end' }}>
          <div style={{ order: 2 }} >
            <Figure key={f.id} sel={sel} handler={handler} {...f} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', order: (upOrDown ? 3 : 1) }} >
            <div style={{ order: (upOrDown ? 1 : 3) }} >
              {(f.attackers.length === 0) ? '' : (upOrDown ? '↑' : '↓')}
            </div>
            <div style={{ order: 2 }}>
              {f.attackers.map(a => <Figure key={a.id} sel={attackSource === a.id} handler={selectAttackSource} {...a} />)}
            </div>
          </div>
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
         .filter(pf => {
           return (!active || !sources.includes(String(pf.id)));
         })
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
  active: amIActivePlayer(state, ownProps.playerId),
  attackSource: getAttackSource(state),
  figures: prepareFigures(state, ownProps.playerId),
  upOrDown: ownProps.playerId === 1,
});

export default connect(mapStateToProps, {
  selectAttackSource: selectAttackSourceCreator,
  selectAttackTarget: selectAttackTargetCreator,
})(FigureRow);
