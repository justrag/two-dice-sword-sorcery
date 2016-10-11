import { combineReducers } from 'redux';
import game, * as fromGame from './game';
import ui, * as fromUi from './ui';

export const getTurn = (state) => fromGame.getTurn(state.game);
export const getPhase = (state) => fromGame.getPhase(state.game);
export const getInitRoll = (state) => fromGame.getInitRoll(state.game);
export const getPlayerFigures =
  (state, playerId) => fromGame.getPlayerFigures(state.game, playerId);
export const getMovementSource = (state) => fromUi.getMovementSource(state.ui);
export const isPlayerActive = (state, playerId) => fromGame.isPlayerActive(state.game, playerId);
export const getAssignments = (state) => fromUi.getAssignments(state.ui);
const getActiveFiguresCount = (state) => fromGame.getActiveFiguresCount(state.game);
const getAssignedFiguresCount = (state) => fromUi.getAssignedFiguresCount(state.ui);
export const areAnyFiguresUnassigned = (state) =>
  (getActiveFiguresCount(state) !== getAssignedFiguresCount(state));
const areAssignmentsDoubledUp = (state) => fromUi.areAssignmentsDoubledUp(state.ui);
const getInactiveFiguresCount = (state) => fromGame.getInactiveFiguresCount(state.game);
export const areFiguresDoubledUpIllegally = (state) =>
  (areAssignmentsDoubledUp(state) &&
    getAssignedFiguresCount(state) < getInactiveFiguresCount(state));
export const areAssignmentsReady = (state) =>
  (!areAnyFiguresUnassigned(state) && !areFiguresDoubledUpIllegally(state));
export const getPlayerName = (state, playerId) => fromGame.getPlayerName(state.game, playerId);
export const isPlayerMoving = (state, playerId) => fromGame.isPlayerMoving(state.game, playerId);
export const getActivePlayer = (state) => fromGame.getActivePlayer(state.game);
const getAssignedSources = (state) => fromUi.getAssignedSources(state.ui);
export const getUnassignedActiveFigures = (state) => {
  const sources = getAssignedSources(state);
  return getPlayerFigures(state, getActivePlayer(state))
         .filter(f => !sources.includes(String(f.id)));
};
export const getInactiveFigures = (state) => fromGame.getInactiveFigures(state.game);

//
// Are these needed?
//
/*
export const getUnassignedPlayerFigures = (state, playerId) => {
  const sources = getAssignedSources(state);
  return getPlayerFigures(state, playerId).filter(f => !sources.includes(String(f.id)));
};

export const getPlayerFiguresWithAttackers = (state, playerId) => {
  const active = isPlayerActive(state, playerId);
  const playerFigures = getPlayerFigures(state, playerId);
  const assignments = getAssignments(state);
  const allFiguresById = getFiguresById(state);
  const sources = getAssignedSources(state);

  return playerFigures
  // assigned figures will show as attackers
         .filter(pf => (!active || !sources.includes(String(pf.id))))
  // add attackers to figure object
         .map(f => (
           { ...f,
            attackers: Object.keys(assignments)
                            .reduce((atkArr, s) => {
                              if (assignments[s] === f.id) {
                                atkArr.push(allFiguresById[s]);
                              }
                              return atkArr;
                            }, []),
           }
            ));
};
*/
// const getFiguresById = (state) => fromGame.getFiguresById(state.game);
// export const getFiguresById = (state) => fromGame.getFiguresById(state.game);
// export const getFigures = (state) => fromGame.getFigures(state.game);
// export const getAttackSource = (state) => fromUi.getAttackSource(state.ui);
// export const attackDoubledUp = (state) => fromUi.attackDoubledUp(state.ui);
// export const getAssignedAttacksCount = (state) => fromUi.getAssignedAttacksCount(state.ui);
// export const getAssignedAttacks = (state) => fromUi.getAssignedAttacks(state.ui);
// export const getAssignedTargetsCount = (state) => fromUi.getAssignedTargetsCount(state.ui);
// export const getAttack = (state) => fromGame.getAttack(state.game);
// export const getClassOrder = (state) => fromGame.getClassOrder(state.game);
// export const getNotActivatedCasters = (state) => fromGame.getNotActivatedCasters(state.game);
// export const getAttackFigure = (state) => fromUi.getAttackFigure(state.ui);
//

const bulbaReducer = (state, payload) => {
  console.debug('state, payload: %o %o', state, payload);
  return Date.now();
};

const reducer = combineReducers({
  bulba: bulbaReducer,
  game,
  ui,
});

export default reducer;
