import { createReducer } from 'redux-act';

import { selectAttackSource, selectAttackTarget } from '../actionCreators';

export const getAttackSource = (state) => state.attackSource || null;
export const getAttackTarget = (state) => state.attackTarget || null;

const selectAttackSourceReducer = (state, payload) => ({ ...state, attackSource: payload });
const selectAttackTargetReducer = (state, payload) => ({ ...state, attackTarget: payload });

const uiReducer = createReducer({
  [selectAttackSource]: selectAttackSourceReducer,
  [selectAttackTarget]: selectAttackTargetReducer,
},
  {
    attackSource: undefined,
    attackTarget: undefined,
  }
);

export default uiReducer;
