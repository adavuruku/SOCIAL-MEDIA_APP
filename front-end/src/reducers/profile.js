import { GET_PROFILE,GET_PROFILES, PROFILE_ERROR, CLEAR_PROFILE,UPDATE_PROFILE, CLEAR_PROFILES,GET_REPOS, NO_REPOS } from '../actions/types';

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
    case UPDATE_PROFILE:
      return {
        ...state, profile:payload, loading:false
      }
    case GET_PROFILES:
      return {
        ...state, profiles:payload,loading:false
      }
    case PROFILE_ERROR:
      return {
        ...state, profile:null, loading:false, error:payload
      }
    case CLEAR_PROFILE:
        return {
            ...state, profile:null, loading:false, repos:[]
        }
    case CLEAR_PROFILES:
      return {
          ...state, profiles:[], loading:false
      }
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false
      };
    case NO_REPOS:
      return {
        ...state,
        repos: []
      };
    default:
      return state;
  }
}


export default profileReducer;