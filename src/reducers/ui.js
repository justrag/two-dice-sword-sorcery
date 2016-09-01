import { createReducer } from 'redux-act';

import { selectAttackSource } from '../actionCreators';

const selectAttackSourceReducer = (state, payload) => ({ ...state, selected: payload });

const uiReducer = createReducer({
  [selectAttackSource]: selectAttackSourceReducer,
},
  {
    selected: undefined,
    attack: [],
  }
);

export default uiReducer;
