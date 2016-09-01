import React from 'react';
import AppBar from 'material-ui/AppBar';

const TurnBar = ({ turn }) => (
  <AppBar
    title={<span>Turn {turn}</span>}
    iconElementLeft={<span>2d6 S&S</span>}
    iconElementRight={<span>{turn}</span>}
  />
  );
TurnBar.propTypes = { turn: React.PropTypes.number.isRequired };

export default TurnBar;
