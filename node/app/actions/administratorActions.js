import { load, cancel, showInfo, INFO_TYPES, setOver, receiveNewResults } from './homeActions'

import { closeVote, getAdminVisibilities, getAdminResults, adminEventSubscription, startMiner, stopMiner } from '../api/geth'


export function subscribeAdminEvents(){
  return (dispatch)=>{

    var onSuccess = (results)=>{
      dispatch(receiveNewResults(results)); 
      dispatch(showInfo("Nouvelle réponse au sondage",INFO_TYPES.SUCCESS));
    }

    var onFail = (error)=>{
      dispatch(showInfo(error,INFO_TYPES.ERROR));
    }

    adminEventSubscription(onSuccess,onFail);
  }
}

export function initAdminVisibilities(){
  return (dispatch)=>{
    var onSuccess = (index,questionVisibility)=>{
      dispatch(setVisibility(index,questionVisibility));
    }

    var onFail = (error)=>{
      var msg = error ? error : "Impossible de récupérer une information (accès refusé)";
      dispatch(showInfo(msg,INFO_TYPES.ERROR));
    }

    getAdminVisibilities(onSuccess,onFail);
  }
}

export function initAdminResults(){
  return (dispatch)=>{
    var onSuccess = (results)=>{
      dispatch(receiveNewResults(results));
    }

    var onFail = (error)=>{
      dispatch(showInfo(error,INFO_TYPES.ERROR));
    }

    getAdminResults(onSuccess,onFail);
  }
}

export const SET_VISIBILITY = 'SET_VISIBILITY';
export function setVisibility(idQuestion,visible) {
  return {
    type: SET_VISIBILITY,
    payload: {idQuestion: idQuestion,visible: visible}
  };
}

export const VALID_SUBMIT = 'VALID_SUBMIT';

export function validSubmit() {
  return (dispatch,getState) => {

    const {administrator} = getState();
    var visibilities = administrator.visibility;
    visibilities = visibilities.map((v)=>{return v.visible});

    dispatch(load(true))

    var onSuccess = ()=>{
      dispatch( cancel() );
      dispatch( setOver(true) );
      dispatch( showInfo("Vous venez de terminer le vote",INFO_TYPES.SUCCESS) );
      stopMiner();
    };

    var onFail = (message)=>{
      dispatch( cancel() );
      dispatch( showInfo(message,INFO_TYPES.ERROR) );
      stopMiner();
    };

    startMiner();
    closeVote(visibilities,onSuccess,onFail);

  };
}

