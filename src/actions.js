export const ROLL_FOR_INITIATIVE = 'ROLL_FOR_INITIATIVE';
export const SET_STATE = 'SET_STATE';
export const TARGET='TARGET';

export const SELECT_SOURCE='SELECT_SOURCE';
export const SELECT_TARGET='SELECT_TARGET';

export function selectSource(figure_id) {
  return {
    type: SELECT_SOURCE,
    figure_id: figure_id
  }
}

export function selectTarget(figure_id) {
  return {
    type: SELECT_TARGET,
    figure_id: figure_id
  }
}

export function rollForInitiative() {
  return {
    type: ROLL_FOR_INITIATIVE
  }
}

export function target() {
// This will probably just be 'targetting finished'
  return {
    type: TARGET
  }
}


