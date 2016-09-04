import { combineReducers } from 'redux';
import game, * as fromGame from './game';
import ui from './ui';

export const getFigures = (state) => fromGame.getFigures(state.game);
export const getTurn = (state) => fromGame.getTurn(state.game);
export const getPhase = (state) => fromGame.getPhase(state.game);
export const getInitRoll = (state) => fromGame.getInitRoll(state.game);

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
