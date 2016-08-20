import React from 'react';
import {Step, Stepper, StepLabel} from 'material-ui/Stepper';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import MovementIcon from 'material-ui/svg-icons/action/open-with';
import AttackIcon from 'material-ui/svg-icons/image/flash-on';
import WillToFightIcon from 'material-ui/svg-icons/content/flag';
import {black} from 'material-ui/styles/colors';
import Player from './Player';
import WhatToDo from './WhatToDo';
import {connect} from 'react-redux';
import * as actionCreators from '../actions';
import { bindActionCreators } from 'redux'



export const Phase = ({step}) => {
return (<Stepper activeStep={step}>
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
};

export const TurnBar = ({turn}) => {
  return (
<AppBar
    title={<span>Turn {turn}</span>}
    iconElementLeft={<span>2d6 S&S</span>}
    iconElementRight={<span>{turn}</span>}
  />
    );
}

const paperStyle = {
//  height: 100,
//  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

export const Board = React.createClass({
  getPlayers: function() {
    return this.props.players || [];
  },
  render: function() {
    return <div className="board">
     <TurnBar turn={this.props.turn} />
     {((this.props.turn>0)?<Phase step={this.props.phase} />:"")}
     <WhatToDo turn={this.props.turn} phase={this.props.phase} actions={this.props.actions} />
    {this.getPlayers().map(entry =>
      <Player key={entry.sequence} sourceSelected={this.props.sourceSelected} actions={this.props.actions} {...entry} />
      )}
    <Paper style={paperStyle} zDepth={1}>{this.props.textlog}</Paper>
    </div>;
  }
});

function mapStateToProps(state) {
  return {
    textlog: state.textlog,
    players: state.players,
    turn: state.turn,
    phase: state.phase,
    sourceSelected: state.sourceSelected,

  };
}

function mapDispatchToProps() {}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export const BoardContainer=  connect(mapStateToProps, mapDispatchToProps)(Board);
