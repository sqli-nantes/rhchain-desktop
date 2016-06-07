import collaborator from './collaborator';
import { 	SET_ANSWER, SUBMIT_VOTE,
			VALID_SUBMIT, CLOSE_VALIDATION } from '../actions/collaborator';

export const initialRootState = {
	date: "juin 2016",
	questions: [
		{
			text: "Êtes-vous satisfait(e) de l’ambiance de travail au sein de l’agence ?",
			answered: []
		},
		{
			text: "Êtes-vous satisfait(e) des informations qui vous sont transmises, concernant la situation et les perspectives de l’agence et du groupe ?",
			answered: []
		},
		{
			text: "Êtes-vous satisfait(e) de votre mission actuelle ?",
			answered: []
		}
	]
}

export default function app(state = initialRootState,action){
	return state;
}
