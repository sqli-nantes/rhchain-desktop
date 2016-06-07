import { 	SET_ANSWER, SUBMIT_VOTE,
			VALID_SUBMIT, CLOSE_VALIDATION } from '../actions/collaborator';
import {initialRootState} from './app'


const initialState = {
	answers: [],
	step: 0 /* Zero-based stepper */
}

function getInitialState(){

	for(var i=0 ; i<initialRootState.questions.length ; i++ ){
		initialState.answers[i] = -1;
	}
	console.log(initialState)
	return initialState;
}

export default function collaborator(state = getInitialState(),action){
	switch( action.type ){
		case SET_ANSWER:
			var ret = Object.assign({},state,{ answers: Object.assign([],copyAndAssignValue(state.answers,action.payload.idxQuestion,action.payload.idxAnswer))});
			for(var ans in ret.answers ){
				if( ret.answers[ans] == -1 ) return ret;
			}
			return Object.assign({},ret,{step: 1});
		case SUBMIT_VOTE:
		case VALID_SUBMIT:
		case CLOSE_VALIDATION:
		default: 
			return state;
	}
}

function copyAndAssignValue(array,idx,value){
	var ret = array.slice();
	ret[idx] = value;
	return ret;
}
