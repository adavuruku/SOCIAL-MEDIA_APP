import { setAlert } from './alert';
import axios from 'axios'
import { 
    GET_PROFILE, PROFILE_ERROR,UPDATE_PROFILE,
    ACCOUNT_DELETED, CLEAR_PROFILE,CLEAR_PROFILES, GET_PROFILES,
    GET_REPOS, NO_REPOS
} from '../actions/types';

export const getCurrentProfile = () => async dispatch =>{
    try {
        const res = await axios.get('/api/user/me')
        console.log(res.data,'getCurrentProfile')
        dispatch({
            type:GET_PROFILE,
            payload: res.data.profile
        })
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        })
    }
}

//create or update  a profile -> formData : form values, history : to redirect, edit to know if its eupdate new profile
export const createProfile = (formData, history, edit=false) => async dispatch =>{
    
    try {
        const config = {
            headers:{
                'Content-Type':'application/json'
            } 
        }
        
        let skills = formData.skills.split(',').map(e=>e.trim())
        let bodyData = {
            social:{
                youtube: formData.youtube,
                twitter:formData.twitter,
                facebook:formData.facebook,
                linkedin:formData.linkedin,
                instagram:formData.instagram
            },
            status: formData.status,
            skills: skills,
            location: formData.location,
            website: formData.website,
            company: formData.company,
            bio: formData.bio,
            githubUserName: formData.githubUserName
        }
        // console.log(bodyData)
        const body = JSON.stringify(bodyData)

        const res = await axios.patch('/api/user/update/profile', body, config)
        console.log(res.data,'ddsd')
        dispatch({
            type:GET_PROFILE,
            payload: res.data.profile
        })
        dispatch(setAlert((edit ? 'Profile Updated':'Profile Created'),'success'))
        if(!edit){
            history.push('/dashboard')
        }
    } catch (err) {
        console.log(err.response.data)
        dispatch(setAlert(err.response.data.message, 'danger'))
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        })
    }
}

export const addExperience = (formData, history) => async dispatch =>{
    try {
        const config = {
            headers:{
                'Content-Type':'application/json'
            } 
        }
        const body = JSON.stringify(formData)

        const res = await axios.patch('/api/user/add/experience', body, config)
        console.log(res.data,'ddsd')
        dispatch({
            type:UPDATE_PROFILE,
            payload: res.data.profile
        })
        dispatch(setAlert('Experience Added Successfully','success'))
        history.push('/dashboard')
    } catch (err) {
        console.log(err.response.data)
        dispatch(setAlert(err.response.data.message, 'danger'))
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        })
    }
}
// /add/experience /add/education
export const addEducation = (formData, history) => async dispatch =>{
    try {
        const config = {
            headers:{
                'Content-Type':'application/json'
            } 
        }
        const body = JSON.stringify(formData)

        const res = await axios.patch('/api/user/add/education', body, config)
        console.log(res.data,'ddsd')
        dispatch({
            type:UPDATE_PROFILE,
            payload: res.data.profile
        })
        dispatch(setAlert('Education Added Successfully','success'))
        history.push('/dashboard')
    } catch (err) {
        console.log(err.response.data)
        dispatch(setAlert(err.response.data.message, 'danger'))
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        })
    }
}

// deleteEducation
export const deleteEducation = (educationId) => async dispatch =>{
    try {
        const config = {
            headers:{
                'Content-Type':'application/json'
            } 
        }
        const body = JSON.stringify({educationId})
        // console.log(body)
        const res = await axios.patch('/api/user/delete/education', body, config)
        // console.log(res.data,'ddsd')
        dispatch({
            type:UPDATE_PROFILE,
            payload: res.data.profile
        })
        dispatch(setAlert('Education Remove Successfully','success'))
    } catch (err) {
        console.log(err.response.statusText)
        dispatch(setAlert(err.response.statusText, 'danger'))
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        })
        console.log(err)
    }
}
// deleteExperience
export const deleteExperience = (experienceId) => async dispatch =>{
    console.log('here')
    try {
        const config = {
            headers:{
                'Content-Type':'application/json'
            } 
        }
        const body = JSON.stringify({experienceId})
        // console.log(body)
        const res = await axios.patch('/api/user/delete/experience', body, config)
        // console.log(res.data,'data')
        dispatch({
            type:UPDATE_PROFILE,
            payload: res.data.profile
        })
        dispatch(setAlert('Experience Remove Successfully','success'))
    } catch (err) {
        console.log(err)
        // console.log(err.response.statusText)
        dispatch(setAlert(err.response.data.message, 'danger'))
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.data.message, status:err.response.status}
        })
    }
}

// deleteExperience
export const deleteAccount = (experienceId) => async dispatch =>{
   if(window.confirm('Are you sure? This can  not be undone!')){
        try {
            const config = {
                headers:{
                    'Content-Type':'application/json'
                } 
            }
            const body = JSON.stringify({experienceId})
            // console.log(body)
            const res = await axios.delete('/api/user/', body, config)
            dispatch({
                type:CLEAR_PROFILE
            })
            dispatch({
                type:ACCOUNT_DELETED
            })
            dispatch(setAlert('Your Account Has been Permanently Deleted','success'))
        } catch (err) {
            console.log(err)
            // console.log(err.response.statusText)
            dispatch(setAlert(err.response.data.message, 'danger'))
            dispatch({
                type:PROFILE_ERROR,
                payload:{msg:err.response.data.message, status:err.response.status}
            })
        }
   }
}

// Get all profiles
export const getProfiles = () => async (dispatch) => {
    dispatch({ type: CLEAR_PROFILES })
    try {
      const res = await axios.get('/api/user/profiles');
      console.log(res.data)
      dispatch({
        type: GET_PROFILES,
        payload: res.data.profiles
      });
    } catch (err) {
      dispatch({
        type: CLEAR_PROFILES,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

  // Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
    try {
      const res = await axios.get('/api/profile/user/${userId}');
  
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

  // Get Github repos
export const getGithubRepos = (username) => async (dispatch) => {
    try {
      const res = await axios.get(`/profile/github/${username}`);
  
      dispatch({
        type: GET_REPOS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: NO_REPOS
      });
    }
  };