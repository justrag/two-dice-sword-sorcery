import React from 'react';
import Player from './Player';

export default React.createClass({
  getPlayers: function() {
    return this.props.players || [];
  },
  render: function() {
    return <div className="board">
      {this.getPlayers().map(entry =>
      <Player key={entry.sequence} player={entry} />
      )}
    </div>;
  }
});