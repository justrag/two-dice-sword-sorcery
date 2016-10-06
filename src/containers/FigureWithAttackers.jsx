import React from 'react';
import { connect } from 'react-redux';
import Figure from '../components/Figure';

const FigureWithAttackers = ({ upper }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: upper ? 'flex-start' : 'flex-end' }}
  >
    <div style={{ order: 2 }} >
      <Figure
        id={id}
        name={name}
        chclass={chclass}
        rep={rep}
        ac={ac}
        playerId={player}
        selected={movementSource === f.id}
        handler={playerActive ? selectMovementSource : (movementSource && selectMovementTarget)}
      />

      <Figure sel={sel} handler={handler} {...f} />
    </div>
  </div>
);
FigureWithAttackers.propTypes = {
  upper: React.PropTypes.bool.isRequired,
  id: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  chclass: React.PropTypes.oneOf(['Caster', 'Missile', 'Melee']).isRequired,
  rep: React.PropTypes.number.isRequired,
  ac: React.PropTypes.number.isRequired,
  playerId: React.PropTypes.number.isRequired,
  selected: React.PropTypes.bool,
  handler: React.PropTypes.func,
};

const mapStateToProps = (state, ownProps) => ({
  upper: ownProps.playerId === 1,
});

export default connect(mapStateToProps, {
})(FigureWithAttackers);
