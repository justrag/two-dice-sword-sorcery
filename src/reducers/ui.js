import { createReducer } from 'redux-act';

import { selectAttackSource, selectAttackTarget } from '../actionCreators';

export const getAttackSource = (state) => state.attackSource || null;
export const getSelection = (state) => state.selection;

export const isAttackSelectionComplete = (state) => state.selection.

const selectAttackSourceReducer = (state, payload) => ({ ...state, attackSource: payload });
// const selectAttackTargetReducer = (state, payload) => ({ ...state, attackTarget: payload });
const selectAttackTargetReducer = (state, payload) =>
({ ...state, attackSource: undefined, selection: { ...state.selection, [getAttackSource(state)]: payload } });

const uiReducer = createReducer({
  [selectAttackSource]: selectAttackSourceReducer,
  [selectAttackTarget]: selectAttackTargetReducer,
},
  {
    attackSource: undefined,
    selection: {},
  }
);

export default uiReducer;
