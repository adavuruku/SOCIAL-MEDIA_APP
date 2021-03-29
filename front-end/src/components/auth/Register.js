import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types'; //an npm package to validate the prop types send to this component

const Register = ({ setAlert, register, isAuthenticated}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (email.length <= 0 || name.length <= 0 || password2.length <= 0 || password.length <= 0) {
      setAlert('Passwords do not match', 'danger');
    } else if(password !== password2){
      setAlert('Invalid Data Input', 'danger');
    }else{
      register({ name, email, password });
    }
  };
//redirrect to Dashboard if user is in
if(isAuthenticated){
  return <Redirect to="/dashboard"/>
}
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
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={onChange}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

//define the compoment proptypes
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};


//connect will connect the component to the react store
// {setAlert} tells redux the actions to the component
// also it will add the actions to the props of this component
//syntax is connect(mapStateToProps, actions)
//note that both connect parameter are optional ->
// action define list of action(redux action) you want to use on the component
//mapStateToprops define the data on the staore u want the component to listen to its change

//mapsatae to props has two argument state, ownProps(optional) -> state is the entire content in the store -> ownProps are the properties of the 
//componet that wrap the state or in the connect
//mapStateToProps describe the data in the react store that can change the state of this component - the syntax
/**
 * function mapStateToProps(state) {
  const { todos } = state
  return { todoList: todos.allIds }
}

export default connect(mapStateToProps)(TodoList)
 */
let mapStateToProps = state =>({
  isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { setAlert, register })(Register);
