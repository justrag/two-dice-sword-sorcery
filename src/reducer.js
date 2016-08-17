function setState(state, newState) {
//  return state.merge(newState);
return {...state, ...newState};
}

export default function(state = {}, action) {
  switch (action.type) {
    case 'SET_STATE':
      return setState(state, action.state);
  }
  return state;
}