import React from 'react';
import { connect } from 'react-redux';
import { getAttack, getPhase, getClassOrder, getActivePlayer, getNotActivatedCasters, getAttackFigure } from '../reducers';
import ClassOrderBar from '../components/ClassOrderBar';
import ActionButton from '../components/ActionButton';
import FigureRow from '../containers/FigureRow';

import {
 attackClass as attackClassCreator,
 figureAttacks as figureAttacksCreator,
  } from '../actionCreators';

const AttackBoard = ({ phase, attack, attackClass, classOrder, activePlayer, notActivatedCasters, attackFigure, figureAttacks }) => (
  <div>
    { (classOrder === undefined) ? '' : <ClassOrderBar step={classOrder} /> }
    {(classOrder === 0 && notActivatedCasters > 0) ? <div>Choose a caster!</div> : ''}
    <div>
      <h2 style={{ color: 'red', border: (activePlayer === 1) ? 'thick solid darkred' : '' }}>Player 1</h2>
      <FigureRow playerId={1} />
      <hr />
      <FigureRow playerId={2} />
      <h2 style={{ color: 'green', border: (activePlayer === 2) ? 'thick solid darkgreen' : '' }}>Player 2</h2>
    </div>
    { attackFigure ?
      <ActionButton label="ATTACK WITH CHOSEN FIGURE" action={figureAttacks} />
       : '' }
    { (classOrder === undefined) ? <ActionButton label="Proceed to caster activation" action={() => attackClass(0)} /> : '' }
    { (classOrder === 0 && notActivatedCasters === 0) ? <ActionButton label="Proceed to missile activation" action={() => attackClass(1)} /> : '' }
    { (classOrder === 1) ? <ActionButton label="Proceed to melee activation" action={() => attackClass(2)} /> : '' }
    { (classOrder === 2) ? <ActionButton label="Now test the Will To Fight" action={() => {}} /> : '' }
  </div>
  );
AttackBoard.propTypes = {
  phase: React.PropTypes.number.isRequired,
};

//    <div>
//    {Object.keys(attack).map(source => <div key={source}>{source}, {attack[source]}</div>)}
//    </div>

const mapStateToProps = (state) => (
  {
    phase: getPhase(state),
    attack: getAttack(state),
    classOrder: getClassOrder(state),
    activePlayer: getActivePlayer(state),
    notActivatedCasters: getNotActivatedCasters(state),
    attackFigure: getAttackFigure(state),
  }
  );

export default connect(mapStateToProps, { attackClass: attackClassCreator, figureAttacks: figureAttacksCreator })(AttackBoard);
