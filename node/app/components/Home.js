import React, { Component } from 'react';
import { Link } from 'react-router';

import AppBar from 'material-ui/AppBar';
import ContentClear from 'material-ui/svg-icons/content/clear';
import ActionPowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new';

const styles = {
  root: {
    height: "100vh"
  },
  head:{
    fontSize: "1.2em",
    fontWeight: "bold",
    verticalAlign: "middle"
  },
  icon: {
    marginRight: "1vw",
    height: "5vh",
    wdith: "5vh",
    verticalAlign: "middle"
  },
  close: {
    width: "32px",
    height: "32px",
    marginRight: "2vw",
    marginTop: "1vh"
  }
}

export default class Home extends Component {
  render() {
    return (
      <div style={styles.root}>
        <AppBar
          className="row"
          title={
            <span style={styles.head}>RHChain</span>
          }
          iconElementRight={
            <Link to="/">
              <ActionPowerSettingsNew style={styles.close} color="white"/>
            </Link>
          }
          showMenuIconButton={false}
          zDepth={2}/> 

          {this.props.children}
      </div>
    );
  }
}