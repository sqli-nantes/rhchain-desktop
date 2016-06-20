import { load, cancel, showInfo, INFO_TYPES, setOver } from './homeActions'

import { closeVote } from '../api/geth'

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
    };

    var onFail = (message)=>{
      dispatch( cancel() );
      dispatch( showInfo(message,INFO_TYPES.ERROR) );
    };

    closeVote(visibilities,onSuccess,onFail);

  };
}

