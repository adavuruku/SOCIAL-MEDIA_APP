import { setAlert } from './alert';
import axios from 'axios'
import { 
    REGISTER_FAIL, REGISTER_SUCCESS, 
    USER_LOADED, AUTH_ERROR,
    LOGIN_SUCCESS, LOGIN_FAIL,LOGOUT, CLEAR_PROFILE
} from '../actions/types';

import setAuthToken from '../utils/setAuthToken'

export const loadUser = () => async dispatch =>{
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }else{
        try {
            const res = await axios.get('./api/user/auth')
            console.log(res.data,'ddsd')
            dispatch({
                type:USER_LOADED,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type:AUTH_ERROR
            })
        }

    }
    
}

export const register = ({name, email, password}) => async dispatch => {
  const config = {
      headers:{
          'Content-Type':'application/json'
      } 
  }
  const body = JSON.stringify({name, email, password})
  try {
      const res = await axios.post('./api/user/register', body, config)
    //   console.log(res.data)
      dispatch({
          type:REGISTER_SUCCESS,
          payload: res.data
      })
      // note to call another action from one action call dispatch(action)
      dispatch(loadUser()) //this will help set the headers down
  } catch (error) {
      dispatch(setAlert('Email Already Exist','danger'))
    //   const errors = error.response.data.errors
    //   if(errors){
    //       errors.forEach(error=>dispatch(setAlert(error.msg, 'danger')))
    //   }
    dispatch({
        type:REGISTER_FAIL
    })
  }
};


export const login = ({email, password}) => async dispatch => {
    const config = {
        headers:{
            'Content-Type':'application/json'
        } 
    }
    const body = JSON.stringify({email, password})
    try {
        const res = await axios.post('./api/user/login', body, config)
        console.log(res.data)
        dispatch({
            type:LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser()) //load the axios header down with the new token
    } catch (error) {
        dispatch(setAlert('Invalid Email Address / Password', 'danger'))
        dispatch({
            type:LOGIN_FAIL
        })
    }
  };


  export const logout = () => async dispatch => {
    dispatch({
        type:CLEAR_PROFILE
    })
      dispatch({
          type:LOGOUT
      })
  };

