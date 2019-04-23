import { connect } from 'react-redux';
import { login,validateEmail,validatePass,showLoginError,loginSuccessful } from '../actions';
import Login from '../components/Login'

const mapStatetoProps = state => ({
	loginSuccessful: state.loginSuccessful,
	validEmail: state.validateEmail,
	validPassword: state.validatePass,
	error:state.showLoginError
});
const mapDispatchtoProps = dispatch => ({
	loginMethod : (email,password) =>{dispatch(login(email,password))},
	validateUser : email => {dispatch(validateEmail(email))},
	validatePass : pass => {dispatch(validatePass(pass))},
	reset: () => {
		dispatch(loginSuccessful());
		dispatch(showLoginError(""))
	}

});
export default connect (mapStatetoProps,mapDispatchtoProps)(Login);