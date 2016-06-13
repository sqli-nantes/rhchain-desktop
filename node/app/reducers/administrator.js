import { SET_VISIBILITY, VALID_SUBMIT, END_VALID } from '../actions/administrator';
import {initialRootState} from './home'

const initialState = {
	visibility: [] /* {idQuestion,visible} */
}

function getInitialState(){
	var questions = initialRootState.questions;

	for(var i=0;i<questions.length;i++){
		initialState.visibility[i] = {
			idQuestion: questions[i].id,
			visible: true
		}
	}

	return initialState;
}

export default function administrator(state = getInitialState(),action){
	switch( action.type ){
		case SET_VISIBILITY:
			var visibilities = state.visibility.slice(); //copy array

			visibilities.map((v)=>{
				if( v.idQuestion == action.payload.idQuestion ){
					v.visible = action.payload.visible;
				}
			});

			return 	Object.assign({},state,{visibility: visibilities});

		default: 
			return state;
	}
}