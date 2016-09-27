import React from 'react';
import { connect } from 'react-redux';
import { getClassOrder, getNotActivatedCasters, getAttackFigure } from '../reducers';
import ClassOrderBar from '../components/ClassOrderBar';
import ActionButton from '../components/ActionButton';
import FigureRow from '../containers/FigureRow';
import PlayerBar from '../containers/PlayerBar';

import {
 attackClass as attackClassCreator,
 figureAttacks as figureAttacksCreator,
  } from '../actionCreators';

const AttackBoard = ({
  classOrder,
  notActivatedCasters,
  attackFigure,
  attackClass,
  figureAttacks,
   }) => (
  <div>
    { (classOrder === undefined) || <ClassOrderBar step={classOrder} /> }
    {(classOrder === 0 && notActivatedCasters > 0) && <div>Choose a caster!</div> }
    <div>
      <PlayerBar playerId={1} />
      <FigureRow playerId={1} />
      <hr />
      <FigureRow playerId={2} />
      <PlayerBar playerId={2} />
    </div>
    { attackFigure &&
      <ActionButton label="ATTACK WITH CHOSEN FIGURE" action={figureAttacks} />
    }
    { (classOrder === undefined)
      && <ActionButton label="Proceed to caster activation" action={() => attackClass(0)} /> }
    { (classOrder === 0 && notActivatedCasters === 0)
      && <ActionButton label="Proceed to missile activation" action={() => attackClass(1)} /> }
    { (classOrder === 1)
      && <ActionButton label="Proceed to melee activation" action={() => attackClass(2)} /> }
    { (classOrder === 2)
      && <ActionButton label="Now test the Will To Fight" action={() => {}} /> }
  </div>
  );
AttackBoard.propTypes = {
  classOrder: React.PropTypes.string.isRequired,
  notActivatedCasters: React.PropTypes.number.isRequired,
  attackFigure: React.PropTypes.bool.isRequired,
  attackClass: React.PropTypes.func.isRequired,
  figureAttacks: React.PropTypes.func.isRequired,
};

//    <div>
//    {Object.keys(attack).map(source => <div key={source}>{source}, {attack[source]}</div>)}
//    </div>

const mapStateToProps = (state) => (
  {
    classOrder: getClassOrder(state),
    notActivatedCasters: getNotActivatedCasters(state),
    attackFigure: getAttackFigure(state),
  }
  );

export default connect(mapStateToProps, {
  attackClass: attackClassCreator,
  figureAttacks: figureAttacksCreator,
})(AttackBoard);
