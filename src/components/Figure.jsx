import React from 'react';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import CasterIcon from './CasterIcon';
import MissileIcon from './MissileIcon';
import MeleeIcon from './MeleeIcon';
import RepIcon from './RepIcon';
import ShieldIcon from './ShieldIcon';

const ClassIcon = ({ chclass, fillColor = 'white' }) => {
  switch (chclass) {
    case 'Caster':
      return <CasterIcon fill={fillColor} />;
    case 'Missile':
      return <MissileIcon fill={fillColor} />;
    case 'Melee':
      return <MeleeIcon fill={fillColor} />;
    default:
      return <span>X</span>;
  }
};
ClassIcon.propTypes = {
  chclass: React.PropTypes.oneOf(['Caster', 'Missile', 'Melee']).isRequired,
  fillColor: React.PropTypes.string,
};

const Figure = ({ id, name, chclass, rep, ac, playerId, selected = false, handler = null }) => (
  <Paper
    onClick={handler && (() => handler(id))}
    zDepth={selected ? 5 : 1}
    style={{
      display: 'flex',
      backgroundColor: (playerId === 1) ? 'darkred' : 'darkgreen',
      margin: '5px',
      padding: '5px' }}
  >
    <Avatar
      backgroundColor={(playerId === 1) ? 'red' : 'green'}
      icon={<ClassIcon chclass={chclass} />}
    />
    <span>{name}</span>
    <RepIcon />{rep}
    <ShieldIcon />{ac}
  </Paper>
);
Figure.propTypes = {
  id: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  chclass: React.PropTypes.oneOf(['Caster', 'Missile', 'Melee']).isRequired,
  rep: React.PropTypes.number.isRequired,
  ac: React.PropTypes.number.isRequired,
  playerId: React.PropTypes.number.isRequired,
  selected: React.PropTypes.bool,
  handler: React.PropTypes.func,
};

export default Figure;
// const Figure = ({ id, player, sel, target, handler, chclass, type, rep, ac }) => {
//   const color = (player === 1) ? 'red' : 'green';
//   const border = sel ? 'thick dashed violet' : `thick solid ${color}`;
//   return (
//     <div style={{ color, border, margin: '2px', padding: '2px' }} onClick={() => handler(id)} >
//       {chclass}&nbsp;{type} Rep:&nbsp;{rep}&nbsp;AC:&nbsp;{ac}
//       {target ? `Attacking: ${target}` : ''}
//     </div>
//   );
// };
