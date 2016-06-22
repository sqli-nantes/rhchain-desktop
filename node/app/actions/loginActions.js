var fs = require('fs');

import { hashHistory } from 'react-router';

import ethereumConfig from '../../ethereum.json';
import { createAccount } from '../api/geth';

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
		var error = true;

		if( ethereumConfig.isFirstConnection ){
			ethereumConfig.isFirstConnection = false;
			fs.writeFile('./ethereum.json',JSON.stringify(ethereumConfig),function(err){
	            if( !err ) error = false;
	        });
		}

		if( ethereumConfig.accountPassword == password ){

			if( ethereumConfig.isAdmin ){
				hashHistory.push('/home/admin');
				error = false;
			} else {
				hashHistory.push('/home/collab');
				error = false;
			}
		}

		dispatch(errorInput(error));
	}

}


export const NEW_ACCOUNT = 'NEW_ACCOUNT';
export function newAccount(){

	return {
		type: NEW_ACCOUNT
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

