import { createReducer } from 'redux-act';
import { randomInit, rollForInitiative } from '../actionCreators';

export const getFigures = (state) => state.figures.allIds.map(id => state.figures.byId[id]);
export const getTurn = (state) => state.turn;
export const getPhase = (state) => state.phase;

const randomInitReducer = (state) => {
  const figures = {
    byId: {
      1: { id: 1, player: 1, type: 'STAR', chclass: 'Caster', rep: 5, ac: 6 },
      2: { id: 2, player: 1, type: 'GRUNT', chclass: 'Missile', rep: 4, ac: 4 },
      3: { id: 3, player: 1, type: 'GRUNT', chclass: 'Melee', rep: 3, ac: 6 },
      11: { id: 11, player: 2, type: 'STAR', chclass: 'Caster', rep: 5, ac: 4 },
      12: { id: 12, player: 2, type: 'GRUNT', chclass: 'Missile', rep: 4, ac: 4 },
      13: { id: 13, player: 2, type: 'GRUNT', chclass: 'Missile', rep: 3, ac: 2 },
      14: { id: 14, player: 2, type: 'GRUNT', chclass: 'Melee', rep: 3, ac: 6 },
    },
    allIds: [1, 2, 3, 11, 12, 13, 14],
  };

  return {
    ...state,
    phase: 1,
    figures,
  };
};

const rollForInitiativeReducer = (state) => {
  const newPlayers = [];
  return { ...state, turn: 1, phase: 0, players: newPlayers };
};

//  [decrement]: (state) => state - 1,
//  [add]: (state, payload) => state + payload,
const gameReducer = createReducer({
  [randomInit]: randomInitReducer,
  [rollForInitiative]: rollForInitiativeReducer,
},
{ figures: [],
  turn: 0,
  phase: 0,
   }
  );

export default gameReducer;
