import React from 'react';

const Figure = ({ id, sel, handler, chclass, type, rep, ac }) => {
  const border = sel ? 'thick solid green' : 'thick solid black';
  return (
    <div style={{ border, margin: '2px', padding: '2px' }} onClick={() => handler(id)} >
      {chclass}&nbsp;{type} Rep:&nbsp;{rep}&nbsp;AC:&nbsp;{ac}
    </div>
  );
};
Figure.propTypes = {
  id: React.PropTypes.string.isRequired,
  sel: React.PropTypes.bool.isRequired,
  handler: React.PropTypes.func,
  chclass: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  rep: React.PropTypes.number.isRequired,
  ac: React.PropTypes.number.isRequired,
};

export default Figure;
