import {  load, 
          cancel, 
          showInfo, 
          INFO_TYPES, 
          setOver, 
          receiveNewResults, 
          updateState } from './homeActions'

import {  publishVote, 
          getAdminVisibilities, 
          getAdminResults, 
          adminNewResultsSubscription, 
          adminOpenedSubscription,
          adminClosedSubscription,
          startMiner, 
          stopMiner, 
          close, 
          open } from '../api/geth'


export function subscribeAdminEvents(){
  return (dispatch)=>{

    var onFail = (error)=>{
      dispatch(showInfo(error,INFO_TYPES.ERROR));
    }

    adminNewResultsSubscription((results)=>{
      dispatch(receiveNewResults(results)); 
      dispatch(showInfo("Nouvelle réponse au sondage",INFO_TYPES.SUCCESS));
    },onFail);
    adminOpenedSubscription(()=>{
      dispatch(updateState(0))
    },onFail);
    adminClosedSubscription(()=>{
      dispatch(updateState(2))
    },onFail);

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

export function validSubmit() {
  return (dispatch,getState) => {

    const {administrator} = getState();
    var visibilities = administrator.visibility;
    visibilities = visibilities.map((v)=>{return v.visible});

    dispatch(load(true))

    var onSuccess = ()=>{
      stopMiner();
      dispatch( cancel() );
      dispatch( setOver(true) );
      dispatch( updateState(1));
      dispatch( showInfo("Vous venez de publier les résultats",INFO_TYPES.SUCCESS) );
    };

    var onFail = (message)=>{
      stopMiner();
      dispatch( cancel() );
      dispatch( showInfo(message,INFO_TYPES.ERROR) );
    };

    startMiner();
    publishVote(visibilities,onSuccess,onFail);

  };
}

export function clickCloseSurvey(){
  return (dispatch) => {

    dispatch(load(true))

    var onSuccess = ()=>{
      stopMiner();
      dispatch( cancel() );
      dispatch( showInfo("Vous venez de fermer le vote",INFO_TYPES.SUCCESS) );
    };

    var onFail = (message)=>{
      stopMiner();
      dispatch( cancel() );
      dispatch( setOver(true) );
      dispatch( showInfo(message,INFO_TYPES.ERROR) );
    };

    startMiner();
    close(onSuccess,onFail);

  }
}

export function clickOpenSurvey(){
  return (dispatch) => {

    dispatch(load(true))

    var onSuccess = ()=>{
      stopMiner();
      dispatch( cancel() );
      dispatch( setOver(false) );
      dispatch( showInfo("Vous venez d'ouvrir le vote",INFO_TYPES.SUCCESS) );
    };

    var onFail = (message)=>{
      stopMiner();
      dispatch( cancel() );
      dispatch( showInfo(message,INFO_TYPES.ERROR) );
    };

    startMiner();
    open(onSuccess,onFail);

  }
}