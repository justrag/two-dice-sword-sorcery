import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from "react-tap-event-plugin";

const players=[{sequence: 1, figures: ["ele","mele","dudki"]}
,{sequence: 2, figures: ["ala","ma","kota"]}];

const App = () => (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <Board players={players} />
  </MuiThemeProvider>
);

injectTapEventPlugin();

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
