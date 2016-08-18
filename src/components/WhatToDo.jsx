import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MovementIcon from 'material-ui/svg-icons/action/open-with';

const WhatToDo = ({turn, phase, actions}) => {
	let buttons=<div></div>;
	if (turn==0) {
buttons=<RaisedButton
      label="Roll for Initiative"
      onClick={actions.rollForInitiative}
      style={{margin: 12}}
      icon={<MovementIcon color="black" />}
    />;
	}
  return (
<div>
<div>Turn: {turn}, Phase: {phase}</div>
{buttons}
</div>
    );
};

export default WhatToDo;