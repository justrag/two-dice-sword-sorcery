import { createReducer } from 'redux-act';

import { selectAttackSource, selectAttackTarget } from '../actionCreators';

export const getAttackSource = (state) => state.attackSource || null;
export const getSelection = (state) => state.selection;

export const getAssignedAttacksCount = (state) => Object.keys(getSelection(state)).length;

export const getAssignedTargets = (state) => {
  const selection = getSelection(state);
  return Object.keys(selection).map(k => selection[k]); // Object.values(selection)
};

export const attackDoubledUp = (state) => {
  const targets = getAssignedTargets(state);
  const uniqueTargets = new Set(targets);
  console.log(`Double up?: ${targets.length} ? ${uniqueTargets.size}`);
  return (targets.length !== uniqueTargets.size);
};

export const getAssignedTargetsCount = (state) => {
  const selection = getSelection(state);
  const values = Object.keys(selection).map(k => selection[k]); // Object.values(selection)
  const unique = new Set(values);
  return unique.size;
};


const selectAttackSourceReducer = (state, payload) => ({ ...state, attackSource: payload });
// const selectAttackTargetReducer = (state, payload) => ({ ...state, attackTarget: payload });
const selectAttackTargetReducer = (state, payload) =>
  (
    { ...state,
    attackSource: undefined,
    selection: { ...state.selection, [getAttackSource(state)]: payload },
  }
  );

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
