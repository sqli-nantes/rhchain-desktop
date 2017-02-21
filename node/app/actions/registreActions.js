import { hashHistory } from 'react-router';
import { load, submit, cancel, showInfo,INFO_TYPES } from './homeActions'
import {getCoinbase,checkBalance,getBalance ,sendMoneyFromCoinBase} from '../api/geth';
import {getVoteState,mineOneBlock,startMiner,stopMiner} from '../api/geth';
import $ from 'jquery';
// Config
var config = require("../config.js") ;

export const USERS_LOADING = 'USERS_LOADING';
export const USERS_LOADED ='USERS_LOADED';

export function usersLoading() {

	return (dispatch, getState) => {
		dispatch({ type : USERS_LOADING});

		// Récuperation du registre des utilisateur enregistré
		$.get(config.URL_API_BACKEND+'/users').then(
			(users) => {
				// Récuperation des soldes
				var promiseSoldes = [];
				for (var i = 0; i < users.length; i++){


					var promiseSolde = new Promise((resolve) =>
					{
						var user = users[i];
						getBalance(user.adress, (balance) => {
									console.log("getting balance of",user, balance);
									user.solde = balance;
									// Quand le résultat est trouvé on le remonte
								  resolve(balance);

						});
					});
					//Ajout de la promise dans le tableau
					promiseSoldes.push(promiseSolde);
				}
				// Attente des reponses complètes
				var p = Promise.all(promiseSoldes).then(()=>{
						// console.log("resolved All");
						dispatch({ type : USERS_LOADED, users : users}) ;
				});
			}
		);
	}
}

export const VALID_SUBMIT = 'VALID_SUBMIT';
export function validSubmit() {

  return (dispatch, getState) => {

		console.log("Transfert Argent");
  	var state = getState();


    var onSuccess = ()=>{
			console.log("Envoie d'argent réalisé avec succès.");
      stopMiner();
      dispatch( cancel());
      dispatch( showInfo("Vous avez alimenter les comptes.", INFO_TYPES.SUCCESS) );

			// Rechargement de la liste des utilisateurs
			dispatch( usersLoading());
    };

		var onFail = (message)=>{
				console.log("Envoie d'argent en erreur",message);
       stopMiner();
       dispatch( cancel() );
       dispatch( showInfo(message, INFO_TYPES.ERROR) );
    };

    startMiner();

		//Déblocage du compte coinbase
		var allPromises = [];
		// console.log("users :", state.registre.users);

		for(var i=0; i < state.registre.users.length; i++){

			var user  = state.registre.users[i];
			var p = new Promise((resolve,reject) => {
				console.log("appel asynchrone : sendMoneyFromCoinBase");
				sendMoneyFromCoinBase(user.adress,
				  ()=>{ resolve();}
				 ,()=>{ reject();}
				);
			});
			// Ajout de l'attente de la promise courante
			allPromises.push(p);
		}

		// Attente des reponses complètes
		Promise.all(allPromises)
		.then(()=>{onSuccess();}
		,(error)=>{onFail(error)});


  }
}
