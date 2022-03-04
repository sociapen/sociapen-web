import React from 'react';
import useDocumentTitle from '../handleTitle';
import './css/SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../contexts/Auth';
import { auth, fdb } from '../App';
import * as firebaseAuth from 'firebase/auth';
import { getDocs, query, collection, where } from 'firebase/firestore';

export function VerifyEmail() {
	useDocumentTitle("SociaPen | VerifyEmail")
	const navigate = useNavigate()
	const { currentUser } = useAuth()
	React.useEffect(() => {
		console.log(currentUser);
		if (currentUser && currentUser.emailVerified) navigate('/menu')
	}, [currentUser, navigate])
	return (
		<div className='sociapen-App-window'>
			<button onClick={() => {firebaseAuth.sendEmailVerification(currentUser, { url: `${window.location.origin}/menu`, handleCodeInApp: true })}}>sendEmailVerification</button>
			<button onClick={() => {firebaseAuth.sendPasswordResetEmail(auth, currentUser.email, { url: `${window.location.origin}/menu`, handleCodeInApp: true })}}>sendPasswordResetEmail</button>
		</div>
	)
}

export default function SignUp() {
	useDocumentTitle("SociaPen | SignUp")
	const navigate = useNavigate()
	const { currentUser, signup, gSignIn } = useAuth()
	const signupSubmitBtn = React.useRef()
	const GoogleSignInBtn = React.useRef()
	const [creds, setCreds] = React.useState({ email: String(), pswd: String(), pswdConf: String(), name: String(), username: String() })
	
	React.useEffect(() => {
		if (currentUser) navigate('/')
	}, [currentUser, navigate])
	
	React.useEffect(() => {
		if (signupSubmitBtn.current && GoogleSignInBtn.current) {
			getDocs(query(collection(fdb, "users"), where("username", "==", creds.username))).then((doc) => {
				signupSubmitBtn.current.disabled = ((creds.email === String() || creds.pswd === String() || creds.name === String() || creds.username === String()) || creds.pswdConf !== creds.pswd || !doc.empty)
				GoogleSignInBtn.current.disabled = (creds.username === String() || !doc.empty)
				signupSubmitBtn.current.title = GoogleSignInBtn.current.title = !doc.empty ? 'Username is already taken. Try changing it.' : 'Username is available'
				if (creds.username === String()) signupSubmitBtn.current.title = GoogleSignInBtn.current.title = 'Enter a username'
			})
		}
	}, [creds])

	return (
		<div className='sociapen-App-window'>
			<form className='sociapen-App-signup-container' onSubmit={(e) => { e.preventDefault(); signup(creds) }}>
				<h1 style={{padding:'0.5em', color: 'black', backgroundColor: 'var(--fore-color)', width: '100%', borderRadius: '1em 1em 0 0', textAlign: 'center'}}>SignUp</h1>
				<input autoComplete='off' required type='text' placeholder='Your Name' name='name' onChange={(e) => { setCreds((preState) => { return { ...preState, name: e.target.value } }) }}/>
				<input autoComplete='off' required type='email' placeholder='E-mail' name='email' onChange={(e) => { setCreds((preState) => { return { ...preState, email: e.target.value } }) }}/>
				<input autoComplete='off' required type='password' placeholder='Password' name='password' onChange={(e) => { setCreds((preState) => { return { ...preState, pswd: e.target.value } }) }} />
				<input autoComplete='off' required type='password' placeholder='Enter Password Again' name='password' onChange={(e) => { setCreds((preState) => { return { ...preState, pswdConf: e.target.value } }) }} />
				<input autoComplete='off' required type='text' placeholder='Username' name='username' onChange={(e) => { setCreds((preState) => { return { ...preState, username: e.target.value } }) }} />
				<input disabled ref={signupSubmitBtn} type='submit' value="SignUp" />
				<div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
					<hr style={{ width: '90%', border: '0.01em solid var(--theme-color)' }} />
					<button ref={GoogleSignInBtn} onClick={() => gSignIn({ username: creds.username })} className='sociapen-App-signup-gSignInBtn'>SignIn with Google</button>
					<hr style={{ width: '90%', border: '0.01em solid var(--theme-color)' }} />
					<h3 style={{margin: '0.75em 0'}}>Already have an account? <Link style={{color: 'var(--theme-color)'}} to='/auth/login'>Login</Link></h3>
				</div>
			</form>
		</div>
	)
}
