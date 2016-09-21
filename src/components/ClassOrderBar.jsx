import React from 'react';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import { black } from 'material-ui/styles/colors';
import CasterIcon from './CasterIcon';
import MissileIcon from './MissileIcon';
import MeleeIcon from './MeleeIcon';

const ClassOrderBar = ({ step }) => (<Stepper activeStep={step}>
  <Step>
    <StepLabel icon={<CasterIcon color={black} />}>Caster</StepLabel>
  </Step>
  <Step>
    <StepLabel icon={<MissileIcon color={black} />}>Missile</StepLabel>
  </Step>
  <Step>
    <StepLabel icon={<MeleeIcon color={black} />}>Melee</StepLabel>
  </Step>
</Stepper>
);
ClassOrderBar.propTypes = { step: React.PropTypes.number.isRequired };

export default ClassOrderBar;
