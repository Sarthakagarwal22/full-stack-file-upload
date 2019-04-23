import React from 'react';
import './login.css'
const Login = ({loginMethod,loginSuccessful,validEmail,validPassword,error,reset,validateUser,validatePass}) => {
	let user;
	let pass;
	return(
		<div className="main">
		<div className="left">
			<div className="heading">
				<h2>Login</h2>
				<p className="sub-heading">Please enter your credentials</p><br/>
				<label className="email_label">EMAIL ADDRESS <span style={{color:"red"}}> *</span><br/>
				<input autoFocus ref={node => {user=node}} type="email" name="user" className="email_input" onKeyPress={(event)=>{if(event.which===13){validateUser(user.value);pass.focus()}}} onBlur={(event)=>{validateUser(user.value)}} style={{borderColor : !loginSuccessful || !validEmail ? "red":"var(--light-grey)"}}/> <br/>
				</label>
				<br/>

				<p className="email_label">PASSWORD <span style={{color:"red"}}> *</span></p>
				<input ref={node => {pass=node}} type="password" name="pass" className="pass_input" onKeyPress={(event)=>{if(event.which===13){validatePass(pass.value);if(validEmail && validPassword){loginMethod(user.value,pass.value)}}}} onBlur={(event)=>{validatePass(pass.value)}} style={{borderColor : !loginSuccessful || !validPassword ? "red":"var(--light-grey)"}}/> <br/>
				<br/>
				<button onClick={()=>{reset();validateUser(user.value); validatePass(pass.value); if(validEmail && validPassword){loginMethod(user.value,pass.value)} }} style={{background: !loginSuccessful ? "red":""}}>Login</button>
				{
					!loginSuccessful && 
					<p className="small red">Password or email combination is wrong</p>
				}
				{
					error.length>0 && 
					<p className="small red">Could Not Connect to Server</p>
				}
				{
					!validEmail && 
					<p className="small red">Invalid Email Address</p>
				}
				{
					!validPassword && 
					<p className="small red">Empty Password field</p>
				}
			</div>	
		</div>
		<div className="right">
		</div>
		</div>
	);
}

export default Login