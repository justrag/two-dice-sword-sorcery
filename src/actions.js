export const ROLL_FOR_INITIATIVE = 'ROLL_FOR_INITIATIVE';
export const SET_STATE = 'SET_STATE';
export const TARGET='TARGET';

export function rollForInitiative() {
  return {
    type: ROLL_FOR_INITIATIVE
  }
}

export function target() {
  return {
    type: TARGET
  }
}


