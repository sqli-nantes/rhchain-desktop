import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Modal from './Modal';

import QuestionList from './QuestionList';
import QuestionItemAdministrator from './QuestionItemAdministrator';
import SubmissionStepper from './SubmissionStepper';

import RaisedButton from 'material-ui/RaisedButton';

import * as AdministratorActions from '../actions/administratorActions';
import * as RegistreActions from '../actions/registreActions';
import * as HomeActions from '../actions/homeActions';

const styles = {

	root: {
		height: "100vh"
	},

	button: {
		position: "absolute",
		bottom: "2vh",
		width: "50vw",
		margin: "0 25vw",
		label:{
			fontSize: "1.5em",
			fontWeight: "bold"
		}
	},
  item: {
    root: {
      height: "20vh",
      marginBottom: "3vh"
    },
    text:{
      height: "30%",
      fontSize: "1.3em"
    },
    sub: {
      height: "70%"
    }
  }

}

export class Administrator extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

	componentDidMount(){
    this.props.usersLoading();
		// raffraichissement periodique des utilisateurs et soldes associés
		// /setInterval(this.props.usersLoading, 20000);

	}

  listUsersRender = function(){
		console.log("RENDER Status:",this.props.registre.status);
    if(this.props.registre.status == undefined){
			return (<li>LOADING</li>);
		}else{
		  if (this.props.registre.status === "LOADED"){
		 		if(this.props.registre.users.length){
		      var users = this.props.registre.users.map((user) => {
		        return (
		          <li>
		            <div>Mail : {user.mail}</div>
		            <div>Adress : {user.adress}</div>
								<div>Solde : {user.solde}</div>
		          </li>);
		      });
		      return (<ul>{users}</ul>);
		    }else{
					return (<li> Aucun utilisateur enregistré sur le questionnaire !</li>)
		    }
			}
		}
  }

  render() {
  	const {administrator, submit, validSubmit, endValid} = this.props;

    var button = 	(<RaisedButton	secondary={true}
												style={styles.button}
												labelStyle={styles.button.label}
												label="Créditer les comptes enregistrés"
												onClick={()=>submit(true)} />
                 );

    return (
    	<div style={styles.root}>
        <h2>Liste des utilisateurs connectés</h2>

        {this.listUsersRender()}
    		{button}

			<Modal onSubmit={()=>{validSubmit(this.props.registre.users)}}/>
		</div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    administrator: state.administrator,
    registre : state.registre,

  };
}

 function mapDispatchToProps(dispatch) {
   return bindActionCreators(Object.assign({},AdministratorActions, RegistreActions, HomeActions), dispatch);
 }

export default connect(mapStateToProps, mapDispatchToProps)(Administrator);
