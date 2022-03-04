import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, fdb } from '../App';
import * as firebaseAuth from 'firebase/auth';
import * as firebaseFirestore from 'firebase/firestore';

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
	const navigate = useNavigate();
	const [currentUser, setCurrentUser] = React.useState(auth.currentUser);
	const [currentUserAdditionalData, setCurrentUserAdditionalData] = React.useState({ name: null, photo: null, username: null});

	React.useEffect(() => {
		firebaseAuth.onAuthStateChanged(auth, (user) => {
			setCurrentUser(user)
			if (user != null) {
				const userDoc = firebaseFirestore.doc(firebaseFirestore.collection(fdb, 'users'), user.uid)
				firebaseFirestore.getDoc(userDoc).then((userdata) => {
					if (userdata.exists()) setCurrentUserAdditionalData(userdata.data())
				})
			}
		})
	}, []);

	async function gSignIn(creds = {username: null}) {
		try {
			const data = await firebaseAuth.signInWithPopup(auth, new firebaseAuth.GoogleAuthProvider())
			const userDocRef = firebaseFirestore.doc(fdb, 'users', data.user.uid)
			if (creds.username != null || !(await firebaseFirestore.getDoc(userDocRef)).exists()) {
				await firebaseFirestore.setDoc(userDocRef, {
					name: data.user.displayName,
					username: creds.username,
					photo: data.user.photoURL
				})
			}
			navigate('/')
		} catch (error) {
			console.error(error)
		}
	}

	async function login(creds) {
		try {
			await firebaseAuth.signInWithEmailAndPassword(auth, creds.email, creds.pswd)
			navigate('/')
		} catch (error) {
			console.error(error)
		}
	}

	async function signup(creds = {email: null, pswd: null, name: null, username: null}) {
		try {
			const data = await firebaseAuth.createUserWithEmailAndPassword(auth, creds.email, creds.pswd)
			const userDocRef = firebaseFirestore.doc(fdb, 'users', data.user.uid)
			if (!(await firebaseFirestore.getDoc(userDocRef)).exists()) {
				await firebaseFirestore.setDoc(userDocRef, {
					name: creds.name,
					username: creds.username,
					photo: 'rgb(255, 197, 58)'
				})
			}
			await firebaseAuth.sendEmailVerification(data.user, {
				url: window.location.origin
			})
			navigate('/auth/signup/verify')
		} catch (error) {
			console.error(error)
		}
	}

	const value = {
		currentUser,
		currentUserAdditionalData,
		gSignIn,
		login,
		signup
	}

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	)
}

export default function useAuth() {
	return React.useContext(AuthContext)
}