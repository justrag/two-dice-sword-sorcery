import React from 'react';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import MovementIcon from 'material-ui/svg-icons/action/open-with';
import AttackIcon from 'material-ui/svg-icons/image/flash-on';
import WillToFightIcon from 'material-ui/svg-icons/content/flag';
import { black } from 'material-ui/styles/colors';

const PhaseBar = ({ step }) => (<Stepper activeStep={step}>
  <Step>
    <StepLabel icon={<MovementIcon color={black} />}>Movement</StepLabel>
  </Step>
  <Step>
    <StepLabel icon={<AttackIcon color={black} />}>Attack</StepLabel>
  </Step>
  <Step>
    <StepLabel icon={<WillToFightIcon color={black} />}>Will to Fight</StepLabel>
  </Step>
</Stepper>
);
PhaseBar.propTypes = { step: React.PropTypes.number.isRequired };

export default PhaseBar;
