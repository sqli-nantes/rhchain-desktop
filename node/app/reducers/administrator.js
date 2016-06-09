import { SET_VISIBILITY, VALID_SUBMIT, END_VALID } from '../actions/administrator';
import {initialRootState} from './app'

const initialState = {
	visibility: [],
	over: false
}

function getInitialState(){

	for(var i=0 ; i<initialRootState.questions.length ; i++ ){
		initialState.visibility[i] = true;
	}
	return initialState;
}

export default function administrator(state = getInitialState(),action){
	switch( action.type ){
		case SET_VISIBILITY:
			return Object.assign({},state,{
											visibility: copyAndAssignValue(	state.visibility,
																			action.payload.idxQuestion,
																			action.payload.visible)
										})
		case VALID_SUBMIT:
			return state;
		case END_VALID:
			return Object.assign({},state,{over: true});
		default: 
			return state;
	}
}

function copyAndAssignValue(array,idx,value){
	var ret = array.slice();
	ret[idx] = value;
	return ret;
}