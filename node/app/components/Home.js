import React, { Component } from 'react';
import { Link } from 'react-router';

import Date from '../components/Date';
import AppBar from 'material-ui/AppBar';
import ContentClear from 'material-ui/svg-icons/content/clear';
import ActionPowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new';

const styles = {
  root: {
    height: "100vh"
  },
  head:{
    fontSize: "1.2em",
    fontWeight: "bold"
  },
  icon: {
    marginRight: "1vw"
  },
  close: {
    width: "32",
    height: "32",
    marginRight: "2vw",
    marginTop: "1vh"
  }
}

export default class Home extends Component {
  render() {
    return (
      <div style={styles.root}>
        <div className="row">
           
          	<AppBar
          		title={
                <div>
                  <ContentClear style={styles.icon}  viewBox="0 0 18 18" />
                  <span style={styles.head}>RHChain</span>
                </div>
              }
              iconElementRight={
                <Link to="/">
                  <ActionPowerSettingsNew style={styles.close} />
                </Link>
              }
              showMenuIconButton={false}
              zDepth={2}/>
        </div>
        <Date className="row"/>
        {this.props.children}
      </div>
    );
  }
}
