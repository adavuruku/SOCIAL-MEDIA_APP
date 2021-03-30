import { setAlert } from './alert';
import axios from 'axios'
import { 
    GET_PROFILE, PROFILE_ERROR
} from '../actions/types';

export const getCurrentProfile = () => async dispatch =>{
    try {
        const res = await axios.get('/api/user/me')
        console.log(res.data,'ddsd')
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
            // social:{
            //     youtube: formData.youtube,
            //     twitter:formData.twitter,
            //     facebook:formData.facebook,
            //     linkedin:formData.linkedin,
            //     instagram:formData.instagram
            // },
            status: formData.status,
            skills: skills,
            location: formData.location,
            website: formData.website,
            company: formData.company,
            bio: formData.bio,
            githubUserName: formData.githubusername
        }
        console.log(bodyData)
        const body = JSON.stringify(bodyData)

        const res = await axios.patch('/api/user/update/profile', body, config)
        console.log(res.data,'ddsd')
        dispatch({
            type:GET_PROFILE,
            payload: res.data.profile
        })
        dispatch(setAlert((edit ? 'Profile Updated':'Profile Created'),'success'))
        // if(!edit){
        //     history.pushState('/dashboard')
        // }
    } catch (err) {
        console.log(err.response.data)
        dispatch(setAlert(err.response.data.message, 'danger'))
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        })
    }
}