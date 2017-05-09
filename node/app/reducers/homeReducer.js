import { 	SUBMIT, LOAD, CANCEL,
			FETCH_DATA_HASH, RECEIVE_DATA_HASH, 
			FETCH_DATA_STRING, RECEIVE_DATA_STRING,
			RECEIVE_NEW_RESULTS,  
			SHOW_RESULTS,
			SHOW_INFO, HIDE_INFO,
			SET_OVER,
			HAS_MONEY,
			STATE_UPDATED } from '../actions/homeActions';

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
			text: "Question 1"
		},
		{
			id: 1,
			text: "Question 2",
		},
		{
			id: 2,
			text: "Question 3"
		}
	],
	results: [],
	info:{
		opened: false,
		message: "",
		color: ""
	},
	state: 0,
	over: false,
	hasSubmitted: false,
	loading: false,
	hasMoney: false
}



export default function app(state = initialRootState,action){
	switch( action.type ){
		case SUBMIT:
			return Object.assign({},state,{hasSubmitted: true});
		case LOAD:
			return Object.assign({},state,{loading: action.payload.load});
		case CANCEL:
			return Object.assign({},state,{hasSubmitted: false,loading: false});

		case HAS_MONEY:
			return Object.assign({},state,{hasMoney:action.payload.hasMoney});

		case FETCH_DATA_HASH:
			return state;
		case RECEIVE_DATA_HASH:
			return state;
		case FETCH_DATA_STRING:
			return state;
		case RECEIVE_DATA_STRING:
			return state;

		case RECEIVE_NEW_RESULTS:

			var res = action.payload.results.map((question,index)=>{
				return {question: index,values: question.map((answer,index)=>{
					return {answer: index,value: answer};
				})}
			});
			return Object.assign({},state,{results: res});
		
		case SHOW_INFO:
			return Object.assign({},state,{info: {opened: true,message: action.payload.message,color:action.payload.color}});

		case HIDE_INFO:
			return Object.assign({},state,{info: {opened: false,message: "RAS",color:""}});

		case SET_OVER:
			return Object.assign({},state,{over: action.payload.over});

		case STATE_UPDATED:
			return Object.assign({},state,{state:action.payload.newState});

		default:
			return state;
	}
}
