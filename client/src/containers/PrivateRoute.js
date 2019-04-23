import {connect} from 'react-redux';
import { Route,Redirect } from 'react-router-dom';
import React from 'react';

const PrivateRoute = ({component:Component,loginSucceeded}) => {
	return(
		<Route
		render = { () => loginSucceeded ? 
			(<Component />) : ( <Redirect to = {{pathname: "/login"}} /> )
      }
      />
	);
};

const mapStatetoProps =  state => ({
	loginSucceeded:state.loginSucceeded
});

export default connect(mapStatetoProps)(PrivateRoute);