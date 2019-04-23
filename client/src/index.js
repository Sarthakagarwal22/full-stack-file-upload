import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import file from './containers/file';
import updateProgress from './reducers';
import {Router, Route, Switch } from 'react-router-dom'
import Login from './containers/login';
import PrivateRoute from './containers/PrivateRoute'
import history from './history'
import "./helpers/css_variables.css"; 


const store = createStore(updateProgress,applyMiddleware(thunkMiddleware));

const render = () => {
	ReactDOM.render(
		<Provider store={store}>
    	<Router history={history}>
    		<Switch>
	      			<PrivateRoute exact path="/" component={file} />
	      			<Route path="/login" component={Login} />
	      	</Switch>
    	</Router>
  		</Provider>,
		document.getElementById('root')
	)
}

store.subscribe(render);
render();


