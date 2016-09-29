import React from 'react';
import { connect } from 'react-redux';
import Figure from '../components/Figure';
import { getPlayerFigures } from '../reducers/';

const InitFigureRow = ({ figures }) => (
  <div className="figure_row">
    {figures.map(f => <Figure key={f.id} name={f.name} chclass={f.chclass} />)}
  </div>
);
InitFigureRow.propTypes = {
  figures: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};
const mapStateToProps = (state, ownProps) => ({
  figures: getPlayerFigures(state, ownProps.playerId),
});
export default connect(mapStateToProps)(InitFigureRow);
