import React from 'react';
import { connect } from 'react-redux';
import Figure from '../components/Figure';
import { getPlayerFigures, isPlayerActive, getMovementSource } from '../reducers/';
import {
 selectMovementSource as selectMovementSourceCreator,
 selectMovementTarget as selectMovementTargetCreator,
  } from '../actionCreators';

const MovementFigureRow = ({
  figures, playerActive, movementSource,
  selectMovementSource, selectMovementTarget }) => (
  <div className="figure_row" style={{ display: 'flex' }}>
    {figures.map(f =>
      <Figure
        key={f.id}
        id={f.id}
        name={f.name}
        chclass={f.chclass}
        rep={f.rep}
        ac={f.ac}
        playerId={f.player}
        selected={movementSource === f.id}
        handler={playerActive ? selectMovementSource : selectMovementTarget}
      />)}
  </div>
);
MovementFigureRow.propTypes = {
  figures: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  playerActive: React.PropTypes.bool.isRequired,
  movementSource: React.PropTypes.string.isRequired,
  selectMovementSource: React.PropTypes.func.isRequired,
  selectMovementTarget: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  figures: getPlayerFigures(state, ownProps.playerId),
  playerActive: isPlayerActive(state, ownProps.playerId),
  movementSource: getMovementSource(state),
});
export default connect(mapStateToProps, {
  selectMovementSource: selectMovementSourceCreator,
  selectMovementTarget: selectMovementTargetCreator,
})(MovementFigureRow);
