import { createReducer } from 'redux-act';

import { selectMovementSource, selectMovementTarget, selectCurrent } from '../actionCreators';

export const getMovementSource = (state) => state.movementSource;
export const getAssignments = (state) => state.assignments;
export const getAssignedSources = (state) => Object.keys(getAssignments(state));
export const getAssignedFiguresCount = (state) => getAssignedSources(state).length;
const getAssignedTargets = (state) => {
  const assignments = getAssignments(state);
  return Object.keys(assignments).map(k => assignments[k]); // Object.values(assignments)
};
export const areAssignmentsDoubledUp = (state) => {
  const targets = getAssignedTargets(state);
  const uniqueTargets = new Set(targets);
  return (targets.length !== uniqueTargets.size);
};

//
// Are these needed?
//

// export const getAssignedUniqueTargets = (state) => {
//   const unique = new Set(getAssignedTargets(state));
//   return [...unique];
// };

// export const getAssignedTargetsCount = (state) => getAssignedUniqueTargets(state).length;

// export const attackDoubledUp = (state) => {
//   const targets = getAssignedTargets(state);
//   const uniqueTargets = new Set(targets);
//   return (targets.length !== uniqueTargets.size);
// };

// export const getAttackFigure = (state) => state.attackFigure;

//
//
//

const selectMovementSourceReducer = (state, payload) => ({ ...state, movementSource: payload });
const selectMovementTargetReducer = (state, payload) =>
  (
    { ...state,
    movementSource: undefined,
    assignments: { ...state.assignments, [getMovementSource(state)]: payload },
  }
  );

const selectCurrentReducer = (state, payload) => ({ ...state, attackFigure: payload });

const uiReducer = createReducer({
  [selectMovementSource]: selectMovementSourceReducer,
  [selectMovementTarget]: selectMovementTargetReducer,
  [selectCurrent]: selectCurrentReducer,
},
  {
    movementSource: undefined,
    assignments: {},
  }
);

export default uiReducer;
