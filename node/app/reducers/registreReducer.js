import {VALID_SUBMIT, END_VALID } from '../actions/administratorActions';
import {USERS_LOADING, USERS_LOADED } from '../actions/registreActions';
import { initialRootState } from './homeReducer'
// jQuery


const initialState = {
	visibility: [] /* {idQuestion,visible} */
}

function getInitialState(){

	initialState.users = []
	return initialState;
}

export default function registre(state = getInitialState(),action){

	switch( action.type ){

		case USERS_LOADING:
			console.log("reducer ","users loading");
			var s = { ...state } ;
			s.status = "LOADING";
			return(s)

		case USERS_LOADED:
			console.log("reducer ","users loaded");
			var s = { ...state } ;
			s.status = "LOADED"
			s.users = action.users;

			return 	s;

		default:
			return state;
	}
}
