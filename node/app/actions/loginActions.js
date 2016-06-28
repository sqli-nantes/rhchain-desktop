import { hashHistory } from 'react-router';

import { createAccount,unlockAccount60Sec, getCoinbase } from '../api/geth';

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

		var onSuccess = (isAdmin)=>{
			localStorage.setItem('passwd',password);
			if( isAdmin ){
				hashHistory.push('/home/admin');
			} else {
				hashHistory.push('/home/collab');
			}
		};

		var onFail = (err)=>{
			dispatch(errorInput(true));
		}

		getCoinbase(
			(coinbase)=>{unlockAccount60Sec(coinbase, password, onSuccess, onFail );},
			onFail
		)
		

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

