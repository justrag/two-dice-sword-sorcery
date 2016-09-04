import React from 'react';
import Figure from './Figure';

const FigureRow = ({ figures }) => (
  <div className="figure_row" style={{ display: 'flex' }}>
    {figures.map(f => <Figure key={f.id} {...f} />)}
  </div>
  );

export default FigureRow;

