import { createReducer } from 'redux-act';
import { randomInit,
         rollForInitiative,
         initEnd,
         movementEnd,
         attackClass,
         figureAttacks } from '../actionCreators';

import { rollVsRep } from '../game_utils';

export const getTurn = (state) => state.turn;
export const getPhase = (state) => state.phase;
export const getInitRoll = (state) => state.initRoll;
const getFigures = (state) => state.figures.allIds.map(id => state.figures.byId[id]);
export const getPlayerFigures =
  (state, playerId) => getFigures(state).filter(f => f.player === playerId);
const getActivePlayer = (state) => state.activePlayer;
export const isPlayerActive = (state, playerId) => getActivePlayer(state) === playerId;
export const getActiveFiguresCount =
  (state) => getPlayerFigures(state, getActivePlayer(state)).length;
const getInactivePlayer = (state) => 3 - state.activePlayer; // 1->2, 2->1
export const getInactiveFiguresCount =
  (state) => getPlayerFigures(state, getInactivePlayer(state)).length;


const getLeaderRep = (state, playerId) => {
  const figs = getPlayerFigures(state, playerId);
  const leaderFig = figs.filter(f => f.type === 'STAR');
  if (leaderFig.length === 1) return leaderFig[0].rep;
  return Math.max(...figs.map(f => f.rep));
};
const getMovingPlayer = (state) => state.movingPlayer;
export const getPlayerName = (state, playerId) => state.players.byId[playerId].name;
export const isPlayerMoving = (state, playerId) => getMovingPlayer(state) === playerId;
export const getFiguresById = (state) => state.figures.byId;

//
// Are these neeeded?
//
// export const getPlayers = (state) => state.players.allIds.map(id => state.players.byId[id]);
// export const getAttack = (state) => state.attack;
// export const getClassOrder = (state) => state.classOrder;

// export const getNotActivatedCasters =
//  (state) => getPlayerFigures(state, getActivePlayer(state))
//             .filter(f => f.chclass === 'Caster')
//             .filter(f => !f.activated)
//             .length;

//
//

const randomInitReducer = (state) => {
  const figures = {
    byId: {
      1: { id: 1, player: 1, type: 'STAR', chclass: 'Caster', rep: 5, ac: 6, name: 'Ddfhsdfhg' },
      2: { id: 2, player: 1, type: 'GRUNT', chclass: 'Missile', rep: 4, ac: 4, name: 'Isdfseyuye' },
      3: { id: 3, player: 1, type: 'GRUNT', chclass: 'Melee', rep: 3, ac: 6, name: 'Ogrgrfuyeas' },
      4: { id: 4, player: 1, type: 'GRUNT', chclass: 'Caster', rep: 4, ac: 2, name: 'Ughj Yt Reytyt' },
      5: { id: 5, player: 1, type: 'GRUNT', chclass: 'Caster', rep: 4, ac: 4, name: 'Poi Ewrghty' },
      11: { id: 11, player: 2, type: 'STAR', chclass: 'Caster', rep: 5, ac: 4, name: 'Lsdas' },
      12: { id: 12, player: 2, type: 'GRUNT', chclass: 'Missile', rep: 4, ac: 4, name: 'Uytqwer' },
      13: { id: 13, player: 2, type: 'GRUNT', chclass: 'Missile', rep: 3, ac: 2, name: 'Mnhyujgf' },
      14: { id: 14, player: 2, type: 'GRUNT', chclass: 'Melee', rep: 3, ac: 6, name: 'Bnmethyoju' },
    },
    allIds: [1, 2, 3, 4, 5, 11, 12, 13, 14],
  };

  const players = {
    byId: {
      1: { id: 1, type: 'HUMAN', name: 'Human player' },
      2: { id: 2, type: 'COMPUTER', name: 'AI player' },
    },
    allIds: [1, 2],
  };

  return {
    ...state,
    phase: 1,
    figures,
    players,
    movingPlayer: 1,
  };
};

const rollForInitiativeReducer = (state) => {
  const rep1 = getLeaderRep(state, 1);
  const rep2 = getLeaderRep(state, 2);
  const roll1 = rollVsRep(rep1);
  const roll2 = rollVsRep(rep2);
  const pass1 = roll1.passed;
  const pass2 = roll2.passed;

  let startingPlayer;
  if (pass1 > pass2) startingPlayer = 1;
  else if (pass2 > pass1) startingPlayer = 2;
  else if (rep1 > rep2) startingPlayer = 1;
  else if (rep2 > rep1) startingPlayer = 2;
  else startingPlayer = getMovingPlayer(state);

  const initRoll = { rep1, rep2, roll1, roll2, startingPlayer };

  return { ...state,
   phase: 2,
   initRoll,
   activePlayer: startingPlayer,
 };
};

const initEndReducer = (state) => ({ ...state, turn: 1, phase: 0 });

const movementEndReducer = (state, payload) => ({ ...state, phase: 1, attack: payload });

const attackClassReducer = (state, payload) => ({ ...state, classOrder: payload });

const figureAttacksReducer = (state, payload) => ({ ...state, classOrder: payload });

const gameReducer = createReducer({
  [randomInit]: randomInitReducer,
  [rollForInitiative]: rollForInitiativeReducer,
  [initEnd]: initEndReducer,
  [movementEnd]: movementEndReducer,
  [attackClass]: attackClassReducer,
  [figureAttacks]: figureAttacksReducer,
},
{ turn: 0, phase: 0 }
  );

export default gameReducer;
