import React from 'react';
import ReactDOM from 'react-dom';
import {BoardContainer} from './components/Board';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from "react-tap-event-plugin";
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';


// We instantiate a new Redux store
//const store = createStore(reducer);
const store=createStore(reducer, window.devToolsExtension && window.devToolsExtension());
// We dispatch the SET_STATE action holding the desired state
/*
store.dispatch({
  type: 'SET_STATE',
  state: {
    todos: [
      {id: 1, text: 'React', status: 'active', editing: false},
      {id: 2, text: 'Redux', status: 'active', editing: false},
      {id: 3, text: 'Immutable', status: 'active', editing: false},
    ],
    filter: 'all'
  }
});
*/

const players=[{sequence: 1, figures: [{chclass: "Caster", rep: 4, ac: 6},{chclass: "Missile", rep: 5, ac: 4},{chclass: "Melee", rep: 4, ac: 6}]}
,{sequence: 2, figures: [{chclass: "Caster", rep: 6, ac: 4},{chclass: "Missile", rep: 5, ac: 4},{chclass: "Missile", rep: 4, ac: 8},{chclass: "Melee", rep: 5, ac: 6}]}];

store.dispatch({
type: 'SET_STATE',
state: {players: players}
	});

const App = () => (
  <Provider store={store}>
	<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
	<BoardContainer />
	</MuiThemeProvider>
  </Provider>
	);

injectTapEventPlugin();

ReactDOM.render(
	<App />,
	document.getElementById('app')
	);
