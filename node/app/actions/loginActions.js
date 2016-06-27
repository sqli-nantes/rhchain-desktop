// var fs = require('fs');

import { hashHistory } from 'react-router';

import ethereumConfig from '../../ethereum.json';
import { createAccount,unlockAccount60Sec } from '../api/geth';

export const ERROR = 'ERROR';
export function error(error){
	return {
		type: ERROR,
		payload: {error: error}
	}
}


export const ERROR_INPUT = 'ERROR_INPUT';
export function errorInput(error){
	return {
		type: ERROR_INPUT,
		payload: {error: error}
	}
}

export const LOGIN = 'LOGIN';
export function login(password) {

	return (dispatch,getState)=>{

		var connect = ()=>{
			if( ethereumConfig.isAdmin ){
				hashHistory.push('/home/admin');
			} else {
				hashHistory.push('/home/collab');
			}
		}

		var onSuccess = ()=>{

			if( ethereumConfig.isFirstConnection ){
				ethereumConfig.isFirstConnection = false;
				ethereumConfig.accountPassword = password;
				// fs.writeFile('./ethereum.json',JSON.stringify(ethereumConfig),function(err){
		  //           if( !err ) {
		  //           	dispatch(errorInput(false));
		  //           	connect();
		  //           }
		  //       });
			} else connect();
		};

		var onFail = ()=>dispatch(errorInput(true));


		unlockAccount60Sec(	password, onSuccess, onFail );

	}

}


export const NEW_ACCOUNT = 'NEW_ACCOUNT';
export function newAccount(){
	return {
		type: NEW_ACCOUNT
	}
}

export const CANCEL_NEW_ACCOUNT = 'CANCEL_NEW_ACCOUNT';
export function cancelNewAccount(){
	return{
		type: CANCEL_NEW_ACCOUNT
	}
}

export const CREATE_AND_LOGIN = 'CREATE_AND_LOGIN';
export function createAndLogin(password,validation){

	return (dispatch)=>{
		if( password != validation ) dispatch(errorInput(true));

		createAccount(password,
			()=>dispatch(login(password)),
			()=>dispatch(error(true)) );
	}
}

