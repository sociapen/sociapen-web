import React from 'react';
import useDocumentTitle from '../handleTitle';
import './css/Menu.css';
import { useNavigate } from 'react-router-dom';
import { auth } from '../App';
import useAuth from '../contexts/Auth';
//images
import RenderMascot from '../assets/img/RenderMascot';
import SVGperson from '../assets/img/person.svg';
import SVGedit from '../assets/img/edit.svg';
import SVGgear from '../assets/img/gear.svg';
import SVGemail from '../assets/img/email.svg';
import SVGphone from '../assets/img/phone.svg';
import SVGcalender from '../assets/img/calender.svg';

// auth.currentUser.emailVerified

function isURL(url) {
	return new RegExp(/^(ftp|http|https):\/\/[^ "]+$/).test(url);
}

export default function Menu() {
	useDocumentTitle("SociaPen | Menu")
	const navigate = useNavigate()
	const { currentUser, currentUserAdditionalData } = useAuth()
	
	function SignedIn() {
		function Profile() {
			return (
				<div className='sociapen-App-menu-interaction-pane'>
					<div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
						<picture className='sociapen-App-menu-interaction-pane-profile-pic'>
							{ isURL(currentUserAdditionalData.photo) ? <img src={currentUserAdditionalData.photo} alt={currentUserAdditionalData.name} /> : <RenderMascot color={currentUserAdditionalData.photo} /> }
						</picture>
						<h1>{ currentUserAdditionalData.name }</h1>
					</div>
					<div className='sociapen-App-menu-interaction-pane-profile-info'>
						<div><img src={SVGperson} alt="username"/>&nbsp;<span>Username</span>&nbsp;<span style={{color: 'var(--theme-color)'}}>{ currentUserAdditionalData.username }</span></div>
						<div><img src={SVGemail} alt="email"/>&nbsp;<span>Email</span>&nbsp;<span style={{color: 'var(--theme-color)'}}>{ currentUser.email }</span></div>
						{ currentUser.phoneNumber ? <div><img src={SVGphone} alt="phone"/>&nbsp;<span style={{color: 'var(--theme-color)'}}>Phone</span>&nbsp;<span>{ currentUser.phoneNumber }</span></div> : null}
						<div><img src={SVGcalender} alt="joined on"/>&nbsp;<span>Account Created On</span>&nbsp;<span style={{color: 'var(--theme-color)'}}>{ new Date(currentUser.metadata.creationTime ?? Date.now()).toDateString() }</span></div>
						<div><img src={SVGcalender} alt="last login"/>&nbsp;<span>Last SignIn On</span>&nbsp;<span style={{color: 'var(--theme-color)'}}>{ new Date(currentUser.metadata.lastSignInTime ?? Date.now()).toDateString() }</span></div>
					</div>
					<div style={{ flexGrow: '2' }}/>
					<button className='sociapen-App-menu-interaction-pane-logout-btn' onClick={() => auth.signOut().then(() => navigate('/auth/login'))}>Logout</button>
				</div>
			)
		}
		
		function Edit() {
			return (
				<div className='sociapen-App-menu-interaction-pane'>
					Edit your profile here
				</div>
			)
		}
		
		function Settings() {
			return (
				<div className='sociapen-App-menu-interaction-pane'>
					This is settings
				</div>
			)
		}
		
		const [currWindow, setCurrWindow] = React.useState(<Profile/>)
		const [currWindowName, setCurrWindowName] = React.useState("profile")
		
		return (
			<div className='sociapen-App-window' style={{padding: '2rem', display: 'flex'}}>
				<div className='sociapen-App-menu-selection-pane'>
					<button className={currWindowName === "profile" ? 'sociapen-App-menu-selection-pane-selected' : ''} onClick={(e) => { setCurrWindow(<Profile />); setCurrWindowName("profile") }}><img src={SVGperson} alt="profile"/> Profile</button>
					<button className={currWindowName === "edit" ? 'sociapen-App-menu-selection-pane-selected' : ''} onClick={() => { setCurrWindow(<Edit />); setCurrWindowName("edit") }}><img src={SVGedit} alt="edit"/> Edit</button>
					<button className={currWindowName === "settings" ? 'sociapen-App-menu-selection-pane-selected' : ''} onClick={() => { setCurrWindow(<Settings />); setCurrWindowName("settings") }}><img src={SVGgear} alt="settings"/> Settings</button>
				</div>
				{currWindow}
			</div>
		)
	}

	function NotSignedIn() {
		return (
			<div className='sociapen-App-window'>
				<div className='sociapen-App-menu-notSignedIn'>
					<button onClick={() => navigate('/auth/login')}>Login</button>
					<button onClick={() => navigate('/auth/signup')}>SignUp</button>
				</div>
			</div>
		)
	}

	return (currentUser && currentUserAdditionalData) ? <SignedIn/> : <NotSignedIn/>
}