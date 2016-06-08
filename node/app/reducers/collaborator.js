import { SET_ANSWER, VALID_SUBMIT, END_VALID, SHOW_RESULTS } from '../actions/collaborator';
import {initialRootState} from './app'


const initialState = {
	answers: [],
	step: 3 /* Zero-based stepper */
}

function getInitialState(){

	for(var i=0 ; i<initialRootState.questions.length ; i++ ){
		initialState.answers[i] = -1;
	}
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
		case VALID_SUBMIT:
			return Object.assign({},state,{step: 2});
		case END_VALID:
			return Object.assign({},state,{step: 3});
		case SHOW_RESULTS:
			return Object.assign({},state,{step: 4});
		default: 
			return state;
	}
}

function copyAndAssignValue(array,idx,value){
	var ret = array.slice();
	ret[idx] = value;
	return ret;
}
