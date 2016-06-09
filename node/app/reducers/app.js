import { SUBMIT, WAIT } from '../actions/app';

export const initialRootState = {
	date: "juin 2016",
	labels: ["satisfait","neutre","déçu"],
	questions: [
		{
			text: "Êtes-vous satisfait(e) de l’ambiance de travail au sein de l’agence ?",
			answered: [50,40,10]
		},
		{
			text: "Êtes-vous satisfait(e) des informations qui vous sont transmises, concernant la situation et les perspectives de l’agence et du groupe ?",
			answered: [40,50,10]
		},
		{
			text: "Êtes-vous satisfait(e) de votre mission actuelle ?",
			answered: [60,40,0]
		}
	],
	askSubmit: false,
	mustWait: false
}

export default function app(state = initialRootState,action){
	switch( action.type ){
		case SUBMIT:
			return Object.assign({},state,{askSubmit: action.payload.askSubmit});
		case WAIT:
			return Object.assign({},state,{mustWait: action.payload.mustWait});
		default:
			return state;
	}
}
