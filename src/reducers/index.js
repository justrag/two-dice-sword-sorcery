import { combineReducers } from 'redux';
import game, * as fromGame from './game';
import ui, * as fromUi from './ui';

export const getFigures = (state) => fromGame.getFigures(state.game);
export const getPlayerFigures =
  (state, playerId) => fromGame.getPlayerFigures(state.game, playerId);
export const getTurn = (state) => fromGame.getTurn(state.game);
export const getPhase = (state) => fromGame.getPhase(state.game);
export const getActivePlayer = (state) => fromGame.getActivePlayer(state.game);
export const getInitRoll = (state) => fromGame.getInitRoll(state.game);
export const getAttackSource = (state) => fromUi.getAttackSource(state.ui);
export const getAttackTarget = (state) => fromUi.getAttackTarget(state.ui);

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
