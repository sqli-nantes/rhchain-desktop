import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const lightMuiTheme = getMuiTheme({

  palette:{
    primary1Color: "#0A0A0A",
    accent1Color: "#967D4D"
  }
});

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <MuiThemeProvider muiTheme={lightMuiTheme}>
        <div className="container-fluid">
          {this.props.children}
          {
            // (() => {
            //   if (process.env.NODE_ENV !== 'production') {
            //     const DevTools = require('./DevTools'); // eslint-disable-line global-require
            //     return <DevTools />;
            //   }
            // })()
          }
        </div>
      </MuiThemeProvider>
    );
  }
}
