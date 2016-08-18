import {ROLL_FOR_INITIATIVE, SET_STATE} from './actions';
import {rollVsRep} from './roll_vs_rep';

function setState(state, newState) {
return {...state, ...newState};
}

function rollForInitiative(state) {
console.log(`Rep 3: passed ${rollVsRep(3)}d6`);
return state;
//if (state.turn!=0) return state;

//return {...state, ...newState};
}

export default function(state = {}, action) {
  switch (action.type) {
    case SET_STATE:
      return setState(state, action.state);
      case ROLL_FOR_INITIATIVE: 
      return rollForInitiative(state);
  }
  return state;
}