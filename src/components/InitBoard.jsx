import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import RollIcon from 'material-ui/svg-icons/action/supervisor-account';

const RandomInitButton = (props) => (
  <RaisedButton
    label="Random Init"
    onClick={props.randomInit}
    style={{ margin: 12 }}
    icon={<RollIcon color="black" />}
  />
	);
RandomInitButton.propTypes = { randomInit: React.PropTypes.func.isRequired };

const RollForInitiativeButton = (props) => (
  <RaisedButton
    label="Roll for Initiative"
    onClick={props.rollForInitiative}
    style={{ margin: 12 }}
    icon={<RollIcon color="black" />}
  />
	);
RollForInitiativeButton.propTypes = { rollForInitiative: React.PropTypes.func.isRequired };

const InitBoard = (props) => {
  const { turn, phase, actions } = props;
  return (
    <div className="InitBoard">
    { (phase === 'TABULA_RASA') ?
      <RandomInitButton randomInit={actions.randomInit} />
      : <RollForInitiativeButton rollForInitiative={actions.rollForInitiative} />
    }
    </div>
	);
};

export default InitBoard;
