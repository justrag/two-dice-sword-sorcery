import React from 'react';
import Player from './Player';
import {connect} from 'react-redux';

export const Board = React.createClass({
  getPlayers: function() {
    return this.props.players || [];
  },
  render: function() {
    return <div className="board">
    {this.getPlayers().map(entry =>
      <Player key={entry.sequence} {...entry} />
      )}
    </div>;
  }
});

function mapStateToProps(state) {
  return {
    players: state.players
  };
}

export const BoardContainer= connect(mapStateToProps)(Board);
