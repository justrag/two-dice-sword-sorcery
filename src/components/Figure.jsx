import React from 'react';

const Figure = ({ id, player, sel, target, handler, chclass, type, rep, ac }) => {
  const color = (player === 1) ? 'red' : 'green';
  const border = sel ? 'thick dashed violet' : `thick solid ${color}`;
  return (
    <div style={{ color, border, margin: '2px', padding: '2px' }} onClick={() => handler(id)} >
      {chclass}&nbsp;{type} Rep:&nbsp;{rep}&nbsp;AC:&nbsp;{ac}
      {target ? `Attacking: ${target}` : ''}
    </div>
  );
};
Figure.propTypes = {
  id: React.PropTypes.string.isRequired,
  sel: React.PropTypes.bool.isRequired,
  target: React.PropTypes.string,
  handler: React.PropTypes.func,
  chclass: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  rep: React.PropTypes.number.isRequired,
  ac: React.PropTypes.number.isRequired,
  player: React.PropTypes.number.isRequired,
};

export default Figure;
