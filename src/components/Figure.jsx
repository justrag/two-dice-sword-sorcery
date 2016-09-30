import React from 'react';
import Chip from 'material-ui/Chip';
import Badge from 'material-ui/Badge';
import Avatar from 'material-ui/Avatar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import CasterIcon from './CasterIcon';
import MissileIcon from './MissileIcon';
import MeleeIcon from './MeleeIcon';
import RepIcon from './RepIcon';
import ShieldIcon from './ShieldIcon';

const ClassIcon = ({ chclass }) => {
  switch (chclass) {
    case 'Caster':
      return <CasterIcon color="white" />;
    case 'Missile':
      return <MissileIcon color="white" />;
    case 'Melee':
      return <MeleeIcon color="white" />;
    default:
      return <span>X</span>;
  }
};
ClassIcon.propTypes = {
  chclass: React.PropTypes.oneOf(['Caster', 'Missile', 'Melee']).isRequired,
};

const Figure = ({ name, chclass, rep, ac, playerId }) => (
  <Card style={{ backgroundColor: (playerId === 1) ? 'darkred' : 'darkgreen', margin: 3 }}>
    <CardHeader
      title={<h3>{name}</h3>}
      subtitle={<div>
        <Badge badgeContent={rep}>
          <RepIcon color="white" />
        </Badge>
        <Badge badgeContent={ac}>
          <ShieldIcon color="white" />
        </Badge>
      </div>}
      avatar={<Avatar backgroundColor={(playerId === 1) ? 'red' : 'green'} icon={<ClassIcon chclass={chclass} />} />}
    />
  </Card>
);
Figure.propTypes = {
  name: React.PropTypes.string.isRequired,
  chclass: React.PropTypes.oneOf(['Caster', 'Missile', 'Melee']).isRequired,
  rep: React.PropTypes.number.isRequired,
  ac: React.PropTypes.number.isRequired,
  playerId: React.PropTypes.number.isRequired,
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
