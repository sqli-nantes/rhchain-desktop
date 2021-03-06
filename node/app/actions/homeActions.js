
import {getVoteState,getState,mineOneBlock,checkBalance,stopMiner} from '../api/geth';


export function initState(){
  return (dispatch)=>{

    var onSuccess = (results)=>{
      dispatch(receiveNewResults(results));
      dispatch(setOver(true));
    }

    var onFail = (error)=>{
      dispatch(showInfo(error,INFO_TYPES.ERROR));
    }

    getVoteState(onSuccess,onFail);

    getState((state)=>{
      dispatch(updateState(state))
    },onFail);
  }
}

export function mine(){
  return (dispatch)=>{

    var onSuccess = ()=>{
      dispatch(checkPositiveBalance());
    }

    var onFail = ()=>{
      stopMiner();
      dispatch(showInfo("Échec du minage", INFO_TYPES.ERROR));
    }

    mineOneBlock(onSuccess,onFail);
  }
}

export const SUBMIT = 'SUBMIT';
export function submit() {
  return {
    type: SUBMIT
  };
}

export const LOAD = 'LOAD';
export function load(load) {
  return {
    type: LOAD,
    payload: {load: load}
  };
}

export const CANCEL = 'CANCEL';
export function cancel() {
  return {
    type: CANCEL
  };
}

export const FETCH_DATA_HASH = 'FETCH_DATA_HASH';
export function fetchDataHash() {
  return {
    type: FETCH_DATA_HASH
  };
}

export const RECEIVE_DATA_HASH = 'FETCH_DATA_HASH';
export function receiveDataHash(hash) {
  return {
    type: RECEIVE_DATA_HASH
  };
}

export const FETCH_DATA_STRING = 'FETCH_DATA_STRING';
export function fetchDataString() {
  return {
    type: FETCH_DATA_STRING
  };
}

export const RECEIVE_DATA_STRING = 'RECEIVE_DATA_STRING';
export function receiveDataString(strings) {
  return {
    type: RECEIVE_DATA_STRING
  };
}

export const RECEIVE_NEW_RESULTS = 'RECEIVE_NEW_RESULTS';
export function receiveNewResults(results) {
  return {
    type: RECEIVE_NEW_RESULTS,
    payload: {results: results}
  };
}

export const INFO_TYPES = {
  SUCCESS: "#9CCC65",
  ERROR: "#ef5350"
}
export const SHOW_INFO = 'SHOW_INFO';
export function showInfo(message,type) {
  return {
    type: SHOW_INFO,
    payload: {message: message,color:type}
  };
}

export const HIDE_INFO = 'HIDE_INFO';
export function hideInfo() {
  return {
    type: HIDE_INFO
  };
}

export const SET_OVER = 'SET_OVER';
export function setOver(over){
  return {
    type: SET_OVER,
    payload: {over: over}
  };
}

export const HAS_MONEY = 'HAS_MONEY';
export function hasMoney(money){ 
  return {
    type: HAS_MONEY,
    payload: {hasMoney: money}
  } 
}

export const STATE_UPDATED = 'STATE_UPDATED';
export function updateState(state){
  return{
    type: STATE_UPDATED,
    payload: {newState:state}
  }
}

export function checkPositiveBalance(){

  return (dispatch)=>{

    var onSuccess = (balance)=>{
      dispatch(hasMoney(balance>0))
    }

    var onFail = (error)=>{
      console.log(error);
      dispatch(hasMoney(false))
    }

    checkBalance(onSuccess,onFail);
  }

}
