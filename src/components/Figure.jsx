import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import CasterIcon from './CasterIcon';
import MissileIcon from './MissileIcon';
import MeleeIcon from './MeleeIcon';

const ClassIcon = ({ chclass }) => {
  switch (chclass) {
    case 'Caster':
      return <CasterIcon color="black" />;
    case 'Missile':
      return <MissileIcon color="black" />;
    case 'Melee':
      return <MeleeIcon color="black" />;
    default:
      return <span>X</span>;
  }
};
ClassIcon.propTypes = {
  chclass: React.PropTypes.oneOf(['Caster', 'Missile', 'Melee']).isRequired,
};

const Figure = ({ name, chclass }) => (
  <Card>
    <CardHeader
      title={name}
      subtitle={chclass}
      avatar={<Avatar icon={<ClassIcon chclass={chclass} />} />}
    />
    <CardText>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
    </CardText>
  </Card>
);
Figure.propTypes = {
  name: React.PropTypes.string.isRequired,
  chclass: React.PropTypes.oneOf(['Caster', 'Missile', 'Melee']).isRequired,
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
