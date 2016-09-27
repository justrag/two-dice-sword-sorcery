import React from 'react';
import { connect } from 'react-redux';
import { getPlayerName, isPlayerActive, isPlayerMoving } from '../reducers/';

const PlayerBar = ({ id, name, active, moving }) => {
  const color = (id === 1) ? 'red' : 'green';
  const barStyle = {
    color,
    border: active ? `thick solid ${color}` : `thin dashed ${color}`,
  };
  return (
    <div style={{ padding: 15 }} >
      <h2 style={barStyle}>Player {id}: {name} ({moving ? 'moving' : 'non-moving'})</h2>
    </div>
  );
};

PlayerBar.propTypes = {
  id: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  active: React.PropTypes.bool.isRequired,
  moving: React.PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.playerId,
  name: getPlayerName(state, ownProps.playerId),
  active: isPlayerActive(state, ownProps.playerId),
  moving: isPlayerMoving(state, ownProps.playerId),
});

export default connect(mapStateToProps)(PlayerBar);
