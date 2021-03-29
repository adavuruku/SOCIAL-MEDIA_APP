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
