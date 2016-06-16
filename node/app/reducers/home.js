import { 	SUBMIT, LOAD, CANCEL,
			FETCH_DATA_HASH, RECEIVE_DATA_HASH, 
			FETCH_DATA_STRING, RECEIVE_DATA_STRING,
			RECEIVE_NEW_RESULTS, 
			RECEIVE_CLOSING_TIME, 
			SHOW_RESULTS,
			SHOW_INFO, HIDE_INFO } from '../actions/home';

export const initialRootState = {
	answersLabel: [
		{
			id: 0,
			value: "satisfait",
			color: "#9CCC65"

		},
		{
			id: 1,
			value: "neutre",
			color: "#9E9E9E"
		},
		{
			id: 2,
			value: "déçu",
			color: "#ef5350"
		}
	],
	questions: [
		{
			id: 0,
			text: "Êtes-vous satisfait(e) de l’ambiance de travail au sein de l’agence ?"
		},
		{
			id: 1,
			text: "Êtes-vous satisfait(e) des informations qui vous sont transmises, concernant la situation et les perspectives de l’agence et du groupe ?",
		},
		{
			id: 2,
			text: "Êtes-vous satisfait(e) de votre mission actuelle ?"
		}
	],
	results: [
		{
			question: 0,
			values: [
				{
					answer: 0,
					value: 50
				},
				{
					answer: 1,
					value: 40
				},
				{
					answer: 2,
					value: 10
				},
			]
		},
		{
			question: 1,
			values: [
				{
					answer: 0,
					value: 50
				},
				{
					answer: 1,
					value: 50
				}
			]
		},
		{
			question: 2,
			values: [
				{
					answer: 0,
					value: 10
				},
				{
					answer: 1,
					value: 20
				},
				{
					answer: 2,
					value: 70
				},
			]
		},
	],
	info:{
		opened: false,
		message: "",
		color: ""
	},
	over: false,
	hasSubmitted: false,
	loading: false
}

export default function app(state = initialRootState,action){
	switch( action.type ){
		case SUBMIT:
			return Object.assign({},state,{hasSubmitted: true});
		case LOAD:
			return Object.assign({},state,{loading: action.payload.load});
		case CANCEL:
			return Object.assign({},state,{hasSubmitted: false,loading: false});

		case FETCH_DATA_HASH:
			return state;

		case RECEIVE_DATA_HASH:
			return state;

		case FETCH_DATA_STRING:
			return state;
		case RECEIVE_DATA_STRING:
			return state;

		case RECEIVE_CLOSING_TIME:
			console.log(action.payload)
			return Object.assign({},state,{over: true});

		case RECEIVE_NEW_RESULTS:
		case SHOW_INFO:
			console.log(action)
			return Object.assign({},state,{info: {opened: true,message: action.payload.message,color:action.payload.color}});
		case HIDE_INFO:
			return Object.assign({},state,{info: {opened: false,message: "",color:""}});



		default:
			return state;
	}
}
