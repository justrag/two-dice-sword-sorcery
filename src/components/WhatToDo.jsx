import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import RollIcon from 'material-ui/svg-icons/action/supervisor-account';
import MovementIcon from 'material-ui/svg-icons/action/open-with';
import AttackIcon from 'material-ui/svg-icons/image/flash-on';
import WillToFightIcon from 'material-ui/svg-icons/content/flag';

const paperStyle = {
//  height: 100,
//  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

const WhatToDo = ({turn, phase, actions}) => {
	let buttons=<span>More to come...</span>;
	if (turn==0) {
		return (
			<Paper style={paperStyle} zDepth={5}>
			<div>Now both players roll for initiative</div>
			<RaisedButton
			label="Roll for Initiative"
			onClick={actions.rollForInitiative}
			style={{margin: 12}}
			icon={<RollIcon color="black" />}
			/>
			</Paper>
			);
	} else {
		switch (phase) {

			case 0:
		// Movement
		return (
			<Paper style={paperStyle} zDepth={5}>
			<div>Now match up figures</div>
			<RaisedButton
			label="Movement button"
			onClick={actions.target}
			style={{margin: 12}}
			icon={<MovementIcon color="black" />}
			/>
			</Paper>
			);
		break;

		case 1:
		// Attack
		return (
			<Paper style={paperStyle} zDepth={5}>
			<RaisedButton
			label="Attack button"
			style={{margin: 12}}
			icon={<AttackIcon color="black" />}
			/>
			</Paper>
			);
		break;

		case 2:
		// Will To Fight Test
		return (
			<Paper style={paperStyle} zDepth={5}>
			<RaisedButton
			label="Will to Fight button"
			style={{margin: 12}}
			icon={<WillToFightIcon color="black" />}
			/>
			</Paper>
			);
		break;
	}
}

};

export default WhatToDo;