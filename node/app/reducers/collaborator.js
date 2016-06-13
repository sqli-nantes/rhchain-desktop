import { ANSWER, HAS_VOTED } from '../actions/collaborator';
import { initialRootState } from './home'


const initialState = {
	answers: [], /* {idQuestion: , idAnswer: } */
	canSubmit: false,
	hasVoted: false
};

function getInitialState(){

	var questions = initialRootState.questions;

	for(var i=0;i<questions.length;i++){
		initialState.answers[i] = {
			idQuestion: questions[i].id,
			idAnswer: null
		}
	}

	return initialState;
}

export default function collaborator(state = getInitialState(),action){
	switch( action.type ){
		case ANSWER:
			var answers = state.answers.slice() //copy array
			var canSubmit = true;
			answers.map((a) => {
				if( a.idQuestion == action.payload.idQuestion ){
					a.idAnswer = action.payload.idAnswer;
				} else	canSubmit = a.idAnswer != null;
			});

			return Object.assign({},state,{answers: answers, canSubmit: canSubmit});

		case HAS_VOTED:
			return Object.assign({},state,{hasVoted: true});

		default: 
			return state;
	}
}
