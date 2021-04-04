import React, {Fragment, useEffect} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Landing from './components/layout/Landing'
import Navbar from './components/layout/Navbar'
import { loadUser } from "./actions/auth";
import Routes from "./components/routing/Routes";

import {store} from './store'



// if(localStorage.token){
//   setAuthToken(localStorage.token)
// }
const  App= ()=> {
  
  useEffect(()=>{
    store.dispatch(loadUser())
  },[])
  return (
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
  );
}
export default App;
