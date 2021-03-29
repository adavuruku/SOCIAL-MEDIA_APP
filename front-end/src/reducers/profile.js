import { v4 as uuidv4 } from 'uuid';
import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE } from '../actions/types';

const initialState = {
  profile:null,
  profiles:[],
  repos:[],
  loading:true,
  error:{}
};

function profileReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state, profile:payload, loading:false
      }
    case PROFILE_ERROR:
      return {
        ...state, loading:false, error:payload
      }
    case CLEAR_PROFILE:
        return {
            ...state, profile:[], loading:false, repos:[]
        }
    default:
      return state;
  }
}


export default profileReducer;