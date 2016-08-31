import React from 'react';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import MovementIcon from 'material-ui/svg-icons/action/open-with';
import AttackIcon from 'material-ui/svg-icons/image/flash-on';
import WillToFightIcon from 'material-ui/svg-icons/content/flag';
import { black } from 'material-ui/styles/colors';
import { getFigures } from '../reducer';

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
PhaseBar.propTypes = { step: React.PropTypes.number };

const Figure = (props) => <div>{props.chclass}&nbsp;{props.type} Rep:&nbsp;{props.rep}&nbsp;AC:&nbsp;{props.ac}</div>;

const PlayBoard = (props) => {
  const { turn, phase, figures } = props;
  const figs = getFigures(figures);
  return (
    <div>
      <PhaseBar step={phase} />
      <div className="figure_row" style={{display: "flex"}}>
      {figs.map(f => <Figure key={f.id} {...f} />)}
      </div>
    </div>
	);
};

export default PlayBoard;
