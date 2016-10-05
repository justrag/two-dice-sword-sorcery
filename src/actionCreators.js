import { createAction } from 'redux-act';

export const randomInit = createAction('RANDOM_INIT');
export const rollForInitiative = createAction('ROLL_FOR_INITIATIVE');
export const initEnd = createAction('INIT_END');
export const selectMovementSource = createAction('SELECT_MOVEMENT_SOURCE');
export const selectMovementTarget = createAction('SELECT_MOVEMENT_TARGET');
export const movementEnd = createAction('MOVEMENT_END');

export const attackClass = createAction('ATTACK_CLASS');
export const selectCurrent = createAction('SELECT_CURRENT');
export const figureAttacks = createAction('FIGURE_ATTACKS');
