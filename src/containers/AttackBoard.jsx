import React from 'react';
import { connect } from 'react-redux';
import { getAttack, getPhase } from '../reducers';

const AttackBoard = ({ phase, attack }) => (
  <div>
    <div>
      Here be attacking, yarrrgh! - Phase {phase}
    </div>
    <div>
    {Object.keys(attack).map(source => <div>{source}, {attack[source]}</div>)}
    </div>
  </div>
  );
AttackBoard.propTypes = {
  phase: React.PropTypes.number.isRequired,
};

const mapStateToProps = (state) => (
  {
    phase: getPhase(state),
    attack: getAttack(state),
  }
  );

export default connect(mapStateToProps)(AttackBoard);
