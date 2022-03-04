import React from 'react';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../handleTitle';
import './css/Login.css';
import useAuth from '../contexts/Auth';

export default function Login() {
	useDocumentTitle("SociaPen | Login")
	const { login, gSignIn } = useAuth()
	const loginSubmitBtn = React.useRef()
	const [creds, setCreds] = React.useState({ email: String(), pswd: String() })
	
	React.useEffect(() => {
		loginSubmitBtn.current.disabled = (creds.email === String() || creds.pswd === String())
	}, [creds])

	return (
		<div className='sociapen-App-window'>
			<form className='sociapen-App-login-container' onSubmit={(e) => { e.preventDefault(); login(creds) }}>
				<h1 style={{padding:'0.5em', color: 'black', backgroundColor: 'var(--fore-color)', width: '100%', borderRadius: '1em 1em 0 0', textAlign: 'center'}}>Login</h1>
				<input autoComplete='username' required type='email' placeholder='E-mail' name='email' onChange={(e) => { setCreds((preState) => { return { ...preState, email: e.target.value } }) }}/>
				<input autoComplete='current-password' required type='password' placeholder='Password' name='pswd' onChange={(e) => { setCreds((preState) => { return { ...preState, pswd: e.target.value } }) }} />
				<input type='submit' value="Login" ref={loginSubmitBtn} disabled />
				<div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
					<hr style={{ width: '90%', border: '0.01em solid var(--theme-color)' }} />
					<button onClick={gSignIn} className='sociapen-App-login-gSignInBtn'>SignIn with Google</button>
					<hr style={{ width: '90%', border: '0.01em solid var(--theme-color)' }} />
					<h3 style={{margin: '0.75em 0'}}>Don't have an account? <Link style={{color: 'var(--theme-color)'}} to='/auth/signup'>SignUp</Link></h3>
				</div>
			</form>
		</div>
	)
}