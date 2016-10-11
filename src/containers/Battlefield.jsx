import React from 'react';
import { connect } from 'react-redux';
import Figure from '../components/Figure';
import { getUnassignedActiveFigures, getInactiveFigures, getActivePlayer } from '../reducers/';
import {
 selectMovementSource as selectMovementSourceCreator,
 selectMovementTarget as selectMovementTargetCreator,
  } from '../actionCreators';

const Battlefield = ({
  upOrDown,
  activeFigures,
  inactiveFigures,
  selectMovementSource,
  selectMovementTarget,
   }) => (
  <div
    style={{ display: 'flex',
             flexDirection: 'column',
             justifyContent: (upOrDown) ? 'flex-start' : 'flex-end' }}
  >
    <div style={{ display: 'flex', order: (upOrDown ? 3 : 1) }}>
      {activeFigures.map(f =>
        <Figure
          key={f.id}
          id={f.id}
          name={f.name}
          chclass={f.chclass}
          rep={f.rep}
          ac={f.ac}
          playerId={f.player}
          handler={selectMovementSource}
        />)}
    </div>
    <div style={{ display: 'flex', order: 2 }}>
      {inactiveFigures.map(f =>
        <Figure
          key={f.id}
          id={f.id}
          name={f.name}
          chclass={f.chclass}
          rep={f.rep}
          ac={f.ac}
          playerId={f.player}
          handler={selectMovementTarget}
        />)}
    </div>

  </div>
);
Battlefield.propTypes = {
  upOrDown: React.PropTypes.bool.isRequired,
  activeFigures: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  inactiveFigures: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  selectMovementSource: React.PropTypes.func.isRequired,
  selectMovementTarget: React.PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  upOrDown: getActivePlayer(state) === 1,
  activeFigures: getInactiveFigures(state),
  inactiveFigures: getUnassignedActiveFigures(state),
});
export default connect(mapStateToProps, {
  selectMovementSource: selectMovementSourceCreator,
  selectMovementTarget: selectMovementTargetCreator,
})(Battlefield);
