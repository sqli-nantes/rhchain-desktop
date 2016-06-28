import React,{ Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import ContentClear from 'material-ui/svg-icons/content/clear';
import Snackbar from 'material-ui/Snackbar';

import * as LoginActions from '../actions/loginActions';

const styles={

  root: {
    backgroundColor: "#0A0A0A",
    height: "100%",
    textAlign: "center",
    paddingTop: "25vh",
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
    margin: "2vh 25vw",
    color: "#967D4D"
  },
  snackbar: {
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "#ef5350"
  }

};

export default class Login extends Component {

  componentDidMount(){
    this.props.errorInput(false);
  }

  render() {
    const { login, newAccount, createAndLogin, error, loginState, cancelNewAccount } = this.props;

    var inscriptionButton = !loginState.newAccount ?
      (
        <div>
          <span>ou</span>   

          <RaisedButton primary={true}
                        label="Créer un compte" 
                        style={styles.button}  
                        onClick={newAccount}/>
        </div>
      ) : null; 

    var newAccountCancel = loginState.newAccount ? 
      (
        <RaisedButton primary={true}
                      label={"Annuler"} 
                      style={styles.button} 
                      onClick={cancelNewAccount}/>
      ) : null; 

    var validationField = loginState.newAccount ? 
      ( 
        <TextField 
          className="input-password"
          ref="passwordValidationInput"
          floatingLabelText="Valider le mot de passe"
          type="password" 
          floatingLabelStyle={styles.input.floatingLabelStyle}
          floatingLabelFocusStyle={styles.input.floatingLabelStyle}  
          underlineStyle={styles.input.underlineStyle}
          underlineFocusStyle={styles.input.underlineStyle}
          style={styles.input}
          inputStyle={styles.input.password}
          errorText={errorText} />
      ) : null;

    var mainButtonLabel = loginState.newAccount ? "Créer un compte et m'y connecter" : "Me connecter" ;
    var mainButtonAction = loginState.newAccount ? 
      ()=>createAndLogin(this.refs.passwordInput.input.value, this.refs.passwordValidationInput.input.value) : 
      ()=>login(this.refs.passwordInput.input.value) ;

    var errorText = loginState.errorInput ? "Erreur de saisie" : null;

    return (
      <div style={styles.root}>

        <span style={styles.title} >RH Chain</span>

        <TextField 
          className="input-password"
          ref="passwordInput"
          floatingLabelText="Saisir le mot de passe"
          type="password" 
          floatingLabelStyle={styles.input.floatingLabelStyle}
          floatingLabelFocusStyle={styles.input.floatingLabelStyle}  
          underlineStyle={styles.input.underlineStyle}
          underlineFocusStyle={styles.input.underlineStyle}
          style={styles.input}
          inputStyle={styles.input.password}
          errorText={errorText}/>

        { validationField }
        
        <RaisedButton primary={true}
                      label={mainButtonLabel} 
                      style={styles.button} 
                      onClick={mainButtonAction}/>

        {inscriptionButton}
        {newAccountCancel}

        <Snackbar
          open={loginState.error}
          message="Erreur de connexion"
          autoHideDuration={4000}
          onRequestClose={()=>error(false)}
          bodyStyle={styles.snackbar}/>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loginState: state.login
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({},LoginActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

