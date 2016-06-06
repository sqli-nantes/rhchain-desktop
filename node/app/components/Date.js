import React, { Component } from 'react';

import Paper from 'material-ui/Paper';

const styles = {

  paper: {
    backgroundColor: "#e74c3c",
    height: "5vh",
    color: "white",
    fontSize: "2.5vh",
    textAlign: "center",
    center: true,
    margin: "1vh 30vw"
  },
  span: {
    lineHeight: "5vh",
    verticalAlign: "middle"
  }
}

export default class Date extends Component {
  render() {
    return (
      <Paper  style={styles.paper}
              zDepth={2}>
        <span style={styles.span}>Juin 2016</span>
      </Paper>    
    );
  }
}
