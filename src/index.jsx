import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

import BoardContainer from './components/Board';
import reducer from './reducer';

// We instantiate a new Redux store
// const store = createStore(reducer);
const store = createStore(reducer, window.devToolsExtension && window.devToolsExtension());

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
