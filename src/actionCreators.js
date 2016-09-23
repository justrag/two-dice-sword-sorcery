import { createAction } from 'redux-act';

export const randomInit = createAction('RANDOM_INIT');
export const rollForInitiative = createAction('ROLL_FOR_INITIATIVE');
export const initEnd = createAction('INIT_END');
export const selectAttackSource = createAction('SELECT_ATTACK_SOURCE');
export const selectAttackTarget = createAction('SELECT_ATTACK_TARGET');
export const attack = createAction('ATTACK');
export const attackClass = createAction('ATTACK_CLASS');
export const selectCurrent = createAction('SELECT_CURRENT');
export const figureAttacks = createAction('FIGURE_ATTACKS');
