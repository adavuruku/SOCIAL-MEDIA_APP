import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

// reducers define the content in the redux stores
// more of a table in the db(store)
const initialState = [];

function alertReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}

export default alertReducer;