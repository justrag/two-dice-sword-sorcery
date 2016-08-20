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
			<Figure key={index} playerActive={this.props.active} sourceSelected={this.props.sourceSelected} actions={this.props.actions} {...entry} />
			)}
		</div>;
	}
});