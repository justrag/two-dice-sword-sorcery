import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import RollIcon from 'material-ui/svg-icons/action/supervisor-account';

const ActionButton = ({ label, action }) => (
  <RaisedButton
    label={label}
    onClick={action}
    style={{ margin: 12 }}
    icon={<RollIcon color="black" />}
  />
	);
ActionButton.propTypes = {
  label: React.PropTypes.string.isRequired,
  action: React.PropTypes.func.isRequired,
};

export default ActionButton;
