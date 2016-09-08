import { createReducer } from 'redux-act';
import { randomInit, rollForInitiative, initEnd } from '../actionCreators';

import { rollVsRep } from '../game_utils';

export const getFigures = (state) => state.figures.allIds.map(id => state.figures.byId[id]);
export const getPlayerFigures =
  (state, playerId) => getFigures(state).filter(f => f.player === playerId);
export const getTurn = (state) => state.turn;
export const getActivePlayer = (state) => state.activePlayer || 0;
export const getPhase = (state) => state.phase;
export const getPlayers = (state) => state.players.allIds.map(id => state.players.byId[id]);
export const getInitRoll = (state) => state.initRoll;

const findMovingPlayer = (state) => getPlayers(state).filter(p => p.moving)[0];
const findMovingPlayerId = (state) => findMovingPlayer(state).id;

const findLeaderRep = (state, playerId) => {
  const figs = getPlayerFigures(state, playerId);
  const leaderFig = figs.filter(f => f.type === 'STAR');
  if (leaderFig.length === 1) return leaderFig[0].rep;
  return Math.max(...figs.map(f => f.rep));
};

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

  const players = {
    byId: {
      1: { id: 1, type: 'HUMAN', moving: true, name: 'Human player' },
      2: { id: 2, type: 'COMPUTER', moving: false, name: 'AI player' },
    },
    allIds: [1, 2],
  };

  return {
    ...state,
    phase: 1,
    figures,
    players,
  };
};

const rollForInitiativeReducer = (state) => {
  const rep1 = findLeaderRep(state, 1);
  const rep2 = findLeaderRep(state, 2);
  const roll1 = rollVsRep(rep1);
  const roll2 = rollVsRep(rep2);
  const pass1 = roll1.passed;
  const pass2 = roll2.passed;

  let startingPlayer;
  if (pass1 > pass2) startingPlayer = 1;
  else if (pass2 > pass1) startingPlayer = 2;
  else if (rep1 > rep2) startingPlayer = 1;
  else if (rep2 > rep1) startingPlayer = 2;
  else startingPlayer = findMovingPlayerId(state);

  const initRoll = { rep1, rep2, roll1, roll2, startingPlayer };

  // const newPlayers = { ...state.players };
  // newPlayers.byId[activePlayer].active = true;
  // newPlayers.byId[inactivePlayer].active = false;
  //  players: { ...state.players, byId: newPlayers },

  return { ...state,
   phase: 2,
   initRoll,
   activePlayer: startingPlayer,
 };
};

const initEndReducer = (state) => ({ ...state, turn: 1, phase: 0 });

//  [decrement]: (state) => state - 1,
//  [add]: (state, payload) => state + payload,
const gameReducer = createReducer({
  [randomInit]: randomInitReducer,
  [rollForInitiative]: rollForInitiativeReducer,
  [initEnd]: initEndReducer,
},
{ turn: 0, phase: 0 }
  );

export default gameReducer;
