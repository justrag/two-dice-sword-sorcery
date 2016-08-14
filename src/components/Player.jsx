import React from 'react';
import Figure from './Figure';

const flexstyle = {display: 'flex'};

export default React.createClass({
	getFigures: function() {
		return this.props.figures || [];
	},
	render: function() {
		return <div className="player" style={flexstyle}>
		{this.getFigures().map((entry,index) =>
			<Figure key={index} {...entry} />
			)}
		</div>;
	}
});