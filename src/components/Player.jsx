import React from 'react';
import Figure from './Figure';

export default React.createClass({
  getFigures: function() {
    return this.props.player.figures || [];
  },
  render: function() {
    return <div className="player">
      {this.getFigures().map((entry,index) =>
      <Figure key={index} figure={entry} />
      )}
    </div>;
  }
});