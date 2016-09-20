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
      if (turn > 0) handler = active ? selectAttackSource : selectAttackTarget;
      const sel = attackSource === f.id;
      return (
        <div key={f.id} style={{ display: 'flex', 'flex-direction': 'column', 'justify-content': (upOrDown) ? 'flex-start' : 'flex-end' }}>
          <div style={{ order: 2 }} >
            <Figure key={f.id} sel={sel} handler={handler} {...f} />
          </div>
          <div style={{ display: 'flex', 'flex-direction': 'column', order: (upOrDown ? 3 : 1) }} >
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

  console.debug('active: %o, sources: %o', active, sources);

  return playerFigures
/*         .filter(pf => (!active || !sources.includes(pf.id))) // remove attacking*/
         .filter(pf => {
           console.debug('pf.id: %o, sources.includes(pf.id): %o', pf.id, sources.includes(pf.id));
           return (!active || !sources.includes(String(pf.id)));
         })
         .map(f => (
           { ...f,
            attackers: Object.keys(selection)
                            .reduce((atkArr, s) => {
                              console.debug('atkArr: %o, s: %o, f.id: %o', atkArr, s, f.id);
                              if (selection[s] === f.id) {
                                atkArr.push(allFiguresById[s]);
                              }
                              return atkArr;
                            }, []),
                             // .filter(s => selection[s] === f.id)
                             // .map(sf => allFiguresById[sf.id]),
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
