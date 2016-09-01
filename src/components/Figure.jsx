import React from 'react';

const Figure = ({ chclass, type, rep, ac }) => (
  <div>
  {chclass}&nbsp;{type} Rep:&nbsp;{rep}&nbsp;AC:&nbsp;{ac}
  </div>
  );
Figure.propTypes = {
  chclass: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  rep: React.PropTypes.number.isRequired,
  ac: React.PropTypes.number.isRequired,
};

export default Figure;
