import React from 'react';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
//import SvgIconFace from 'material-ui/svg-icons/action/face';
import {teal900, yellow500, red500} from 'material-ui/styles/colors';
import SvgIcon from 'material-ui/SvgIcon';

const styles = {
  unselected: {
    margin: 5
  },
  selected: {
    margin: 3,
    border: "red solid thick"
  }
};

const MeleeIcon = (props) => (
  <SvgIcon viewBox="0 0 512 512" {...props}>
  <path d="m 19.75,14.438 c 59.538,112.29 142.51,202.35 232.28,292.718 l 3.626,3.75 0.063,-0.062 c 21.827,21.93 44.04,43.923 66.405,66.25 -18.856,14.813 -38.974,28.2 -59.938,40.312 l 28.532,28.53 68.717,-68.717 c 42.337,27.636 76.286,63.646 104.094,105.81 l 28.064,-28.06 c -42.47,-27.493 -79.74,-60.206 -106.03,-103.876 l 68.936,-68.938 -28.53,-28.53 c -11.115,21.853 -24.413,42.015 -39.47,60.593 -43.852,-43.8 -86.462,-85.842 -130.125,-125.47 -0.224,-0.203 -0.432,-0.422 -0.656,-0.625 C 183.624,122.75 108.515,63.91 19.75,14.437 Z m 142.345,125.906 200.56,200.53 c -4.36,4.443 -8.84,8.793 -13.405,13.032 L 148.875,153.53 Z" />
  </SvgIcon>
  );
const MissileIcon = (props) => (
  <SvgIcon viewBox="0 0 512 512" {...props}>
  <path d="M492.656 20.406l-118.594 56.22L413.875 86l-86.97 86.97-305.5 259.374.69.687 104.75-47.467-46.376 105.843.905.906 272.5-319.875 73.22-73.218 9.342 39.81 56.22-118.624zm-473.25.063c-1.347 23.43 5 39.947 16.563 52.218l24.093 302.28 17.562-14.874-21.72-272.438c57.975 31.954 169.096 25.165 216.907 106.72l66.625-56.564 1.22-1.218C292.74 38.666 86.01 99.716 19.406 20.47zm359.531 151.56l-1.156 1.157-57.25 67.188c82.006 47.945 75.587 159.267 107.283 218.03l-272.157-24.5-14.812 17.408 301.562 27.125c12.48 12.283 29.4 19.084 53.688 17.687-79.95-67.2-18.36-275.754-117.156-324.094z" />
  </SvgIcon>
  );
const CasterIcon = (props) => (
  <SvgIcon viewBox="0 0 512 512" {...props}>
  <path d="M247.79 18.734C137.967 17.596 19.874 96.94 19.73 244.53l21.403-51.395c-9.485 72.28-7.75 147.236 38.79 202.502L38.2 377.355c39.24 69.774 126.333 90.976 200.855 92.51C124.11 429.9 67.87 342.277 63.912 246.492c-6.722-211.78 260.658-217.694 340.78-75.77-3.417-19.492-8.623-38.426-15.618-56.11 77.406 89.155 59.293 214.875-21.29 253.036-24.25 3.95-48.93 12.06-60.954 19-58.548 33.802-6.27 126.536 53.225 92.188 9.44-5.45 23.404-17.303 36.494-31.352 64.36-59.52 98.1-118.24 93.108-188.94-6.52 29.1-19.175 57.904-35.623 84.683 63.158-146.822 7.956-263.89-144.838-301.354 12.097 5.835 23.503 13.63 33.873 23.36-57.415-23.752-131.123-22.62-186.884 3.505 28.066-26.2 64.776-43.73 102.2-49.642-3.52-.205-7.054-.325-10.597-.362zm-19.74 160.202l-19.843 100.566c-2.958 3.81-5.64 6.852-9.033 9.94l-25.688-49.096-22.705 11.93 31.37 60.945c4.48 11.474 10.02 20.68 15.162 28.524 28.063 42.803 64.547 35.252 95.303 9.555l87.28-48.452-12.71-22.498-66.136 36.94c-1.517-3.154-3.266-6.552-5.056-9.51l67.818-64.96-17.54-18.695-66.47 63.762c-2.356-2.318-4.238-4.527-6.765-6.54l45.084-78.085-22.733-13.127-45.864 78.297c-3.79-1.31-7.72-2.2-11.595-2.745l15.656-81.896-25.533-4.854z" />
  </SvgIcon>
  );

export default React.createClass({
  render: function() {
    let icon;

    if (this.props.chclass=="Caster") {
      icon=<CasterIcon color={yellow500} />;
    } else if (this.props.chclass=="Missile") {
      icon=<MissileIcon color={teal900} />;
    } else if (this.props.chclass=="Melee") {
      icon=<MeleeIcon color={red500} />;
    } else {
      icon=<div />;
    }

    let clickHandler;
    if (this.props.playerActive) {
      clickHandler = () => this.props.actions.selectSource(this.props.id);
    } else {
      clickHandler = () => this.props.actions.selectTarget(this.props.id);
    }
    let selectedStyle=(this.props.sourceSelected==this.props.id)?styles.selected:styles.unselected;
//    console.log(this.props.sourceSelected,this.props.id);

    return (
      <Chip onClick={clickHandler} style={selectedStyle} >
      <Avatar backgroundColor={yellow500} color={red500} icon={icon} />
      Rep: {this.props.rep} AC: {this.props.ac}
      {this.props.attacking?`Attacking: ${this.props.attacking}`:""}
      </Chip>
      )}
  });
