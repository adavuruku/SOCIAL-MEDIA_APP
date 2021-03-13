import{React,Fragment, useState}from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios'

const Register =()=>{
    //form state using react useState
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:'',
        password2:''
    });

    const { name, email, password, password2 } = formData;

    const onChange = (e) =>{
        console.log(e.target.value)
        setFormData({ ...formData, [e.target.name]: e.target.value });

    }
     
      const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            console.log('Password Do Not Match')
        } else {
            console.log(formData)
        //     const newUser = {
        //         "fullName":name,
        //         email,
        //         password
        //     }
        //     try{
        //         const config = {
        //             headers:{
        //                 'Content-Type':'application/json'
        //             }
        //         }
        //         const body = JSON.stringify(newUser)
        //         const res = await axios.post('/api/user/register',body,config)
        //         console.log(res.data)
        //     }catch(err){
        //         console.log(err.response)
        //     }
        }
      };
    
    return (
        <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user" /> Create Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={onChange}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
    )
}

export default Register