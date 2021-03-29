import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';


export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });

  //set this to always dispath the remove_alert to remove item from
  // the alert state store
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};