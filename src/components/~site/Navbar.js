import React from "react";
import "./css/Navbar.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../../contexts/Auth";
//Images
import logo from '../../assets/logo/sociapen-large.svg';
import RenderMascot from "../../assets/img/RenderMascot";

export default function Navbar() {
	const { currentUser } = useAuth()
	const navigate = useNavigate()
	return (
		<nav className='sociapen-App-nav'>
			<img className="sociapen-App-nav-logo" onClick={() => navigate('/')} draggable={false} src={logo} referrerPolicy="no-referrer" alt='SociaPen' title='SociaPen'/>
			<div className="sociapen-App-nav-user" onClick={() => navigate('/menu')}>
				{
					currentUser ?
					currentUser.photoURL ? <img referrerPolicy="no-referrer" draggable={false} src={currentUser.photoURL} alt={currentUser.displayName} title={currentUser.displayName} /> : <RenderMascot color='white'/>
					:
					<RenderMascot unregistered/>
				}
			</div>
		</nav>
	)
}