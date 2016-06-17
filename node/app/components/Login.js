import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import ContentClear from 'material-ui/svg-icons/content/clear';

const styles={

  root: {
    backgroundColor: "#0A0A0A",
    height: "100%",
    textAlign: "center",
    paddingTop: "30vh",
    color: "#967D4D"
  },

  title: {
    fontSize: "3em",
    fontWeight: "bold",
    verticalAlign: "middle"
  },

  input: {
    display: "block",
    width: "50vw",
    margin: "2vh 25vw",
    password: {
      color: "#967D4D"
    },
    floatingLabelStyle: {
      color: "#ffffff"
    },
    underlineStyle: {
      borderColor: "#ffffff"
    }
  },

  button: {
    display: "block",
    width: "50vw",
    margin: "2vh 25vw"
  }

};

export default class Login extends Component {

  onSubmit(){
    event.stopPropagation();
    if( this.refs.passwordInput.input.value == "admin" ){
      hashHistory.push('/home/admin');
    } else {
      hashHistory.push('/home/collab');
    }
  }

  render() {
    return (
      <div style={styles.root}>

        <span style={styles.title} >RH Chain</span>

        <TextField 
          className="input-password"
          ref="passwordInput"
          floatingLabelText="Mot de passe"
          type="password" 
          floatingLabelStyle={styles.input.floatingLabelStyle}
          floatingLabelFocusStyle={styles.input.floatingLabelStyle}  
          underlineStyle={styles.input.underlineStyle}
          underlineFocusStyle={styles.input.underlineStyle}
          style={styles.input}
          inputStyle={styles.input.password}/>
        
        <RaisedButton 
                      primary={true}
                      label="Me Connecter"
                      labelColor={styles.button.color} 
                      style={styles.button} 
                      onClick={this.onSubmit.bind(this)}/>

        <span>ou</span>   

        <RaisedButton
                      primary={true}
                      label="Créer un compte" 
                      style={styles.button} 
                      labelColor={styles.button.color} 
                      onClick={this.onSubmit.bind(this)}/>
      </div>
    );
  }
}
