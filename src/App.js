import React from 'react';
import './App.css';
//libraries
import * as ReactRouter from "react-router-dom";
//firebase
import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { initializeAuth, browserLocalPersistence, browserPopupRedirectResolver } from "firebase/auth";
import { initializeFirestore, CACHE_SIZE_UNLIMITED } from 'firebase/firestore';
//contexts
import { AuthProvider } from './contexts/Auth';
//components
import Navbar from './components/~site/Navbar';
import PageNotFound from './components/~site/PageNotFound';
import Home from './components/Home';
import Menu from './components/Menu';
import Login from './components/Login';
import SignUp, { VerifyEmail } from './components/SignUp';
import Pen from './components/Pen';

window.self.FIREBASE_APPCHECK_DEBUG_TOKEN = process.env.REACT_APP_FIREBASE_APPCHECK_DEBUGTOKEN//remove before build
export const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
	appId: process.env.REACT_APP_FIREBASE_APPID,
})

export const appCheck = initializeAppCheck(app, {
	provider: new ReCaptchaV3Provider(process.env.REACT_APP_RECAPTCHAV3PROVIDER_SITEKEY),
	isTokenAutoRefreshEnabled: true
})

export const auth = initializeAuth(app, {
	popupRedirectResolver: browserPopupRedirectResolver,
	persistence: browserLocalPersistence
})

export const fdb = initializeFirestore(app, {
	cacheSizeBytes: CACHE_SIZE_UNLIMITED
})

export default function App() {
	window.addEventListener('contextmenu', (e) => e.preventDefault())
  	return (
    	<ReactRouter.BrowserRouter>
			<AuthProvider>
			<Navbar />
			<ReactRouter.Routes>
				<ReactRouter.Route path='/' element={<Home />} />
				<ReactRouter.Route path='/menu' element={<Menu />} />
				<ReactRouter.Route path='/auth/login' element={<Login />} />
				<ReactRouter.Route path='/auth/signup' element={<SignUp />} />
				<ReactRouter.Route path='/auth/signup/verify' element={<VerifyEmail />} />
				<ReactRouter.Route path='/pen/:penid' element={<Pen />} />
				<ReactRouter.Route path="*" element={<PageNotFound />} />
			</ReactRouter.Routes>
			</AuthProvider>
    	</ReactRouter.BrowserRouter>
	)
}