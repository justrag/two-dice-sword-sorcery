import React from 'react';
import { connect } from 'react-redux';
import { getAttack, getPhase, getClassOrder } from '../reducers';
import ClassOrderBar from '../components/ClassOrderBar';
import ActionButton from '../components/ActionButton';
import { attackClass as attackClassCreator } from '../actionCreators';

const AttackBoard = ({ phase, attack, attackClass, classOrder }) => (
  <div>
    <ClassOrderBar step={classOrder} />
    <div>
      Here be attacking, yarrrgh! - Phase {phase}
    </div>
    <div>
    {Object.keys(attack).map(source => <div key={source}>{source}, {attack[source]}</div>)}
    </div>
    <ActionButton label={`Proceed to attack class order: ${classOrder + 1}`} action={() => attackClass(classOrder + 1)} />
  </div>
  );
AttackBoard.propTypes = {
  phase: React.PropTypes.number.isRequired,
};

const mapStateToProps = (state) => (
  {
    phase: getPhase(state),
    attack: getAttack(state),
    classOrder: getClassOrder(state),
  }
  );

export default connect(mapStateToProps, { attackClass: attackClassCreator })(AttackBoard);
