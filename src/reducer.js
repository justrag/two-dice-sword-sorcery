import { createReducer } from 'redux-act';
import { combineReducers } from 'redux';

import { randomInit, rollForInitiative, selectAttackSource } from './actionCreators';

export const getFigures = (figures) => figures.allIds.map(id => figures.byId[id]);

const randomInitReducer = (state) => {
  const figures = {
    byId: {
      1: { player: 1, type: 'STAR', chclass: 'Caster', rep: 5, ac: 6 },
      2: { player: 1, type: 'GRUNT', chclass: 'Missile', rep: 4, ac: 4 },
      3: { player: 1, type: 'GRUNT', chclass: 'Melee', rep: 3, ac: 6 },
      11: { player: 2, type: 'STAR', chclass: 'Caster', rep: 5, ac: 4 },
      12: { player: 2, type: 'GRUNT', chclass: 'Missile', rep: 4, ac: 4 },
      13: { player: 2, type: 'GRUNT', chclass: 'Missile', rep: 3, ac: 2 },
      14: { player: 2, type: 'GRUNT', chclass: 'Melee', rep: 3, ac: 6 },
    },
    allIds: [1, 2, 3, 11, 12, 13, 14],
  };

  return {
    ...state,
    phase: 'RANDOMIZED',
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
  phase: 'TABULA_RASA',
   }
  );

const selectAttackSourceReducer = (state, payload) => ({ ...state, selected: payload });

const uiReducer = createReducer({
  [selectAttackSource]: selectAttackSourceReducer,
},
  {
    selected: undefined,
    attack: [],
  }
);

const bulbaReducer = (state, payload) => {
  console.debug('state, payload: %o %o', state, payload);
  return Date.now();
};

const reducer = combineReducers({
  bulba: bulbaReducer,
  game: gameReducer,
  ui: uiReducer,
});

export default reducer;
