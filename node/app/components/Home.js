import React, { Component } from 'react';
import { Link } from 'react-router';

import AppBar from 'material-ui/AppBar';
import Snackbar from 'material-ui/Snackbar';
import ContentClear from 'material-ui/svg-icons/content/clear';
import ActionPowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new';

const styles = {
  root: {
    height: "100vh"
  },
  head:{
    fontSize: "1.2em",
    fontWeight: "bold",
    verticalAlign: "middle",
    color: "#967D4D"
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
  },
  snackbar: {
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "#ff0000"
  }
}

export default class Home extends Component {
  render() {
    const {info,hideInfo} = this.props;

    var snackbarStyle = styles.snackbar;
    snackbarStyle.backgroundColor = info.color;

    return (
      <div style={styles.root}>
        <AppBar
          className="row"
          title={
            <span style={styles.head}>RHChain</span>
          }
          iconElementRight={
            <Link to="/">
              <ActionPowerSettingsNew style={styles.close} color="#967D4D"/>
            </Link>
          }
          showMenuIconButton={false}
          zDepth={2} /> 

          {this.props.children}

          <Snackbar
            open={info.opened}
            message={info.message}
            autoHideDuration={4000}
            onRequestClose={hideInfo}
            style={snackbarStyle}
            bodyStyle={styles.snackbar}/>
      </div>
    );
  }
}