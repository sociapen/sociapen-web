import React from 'react';
import useAuth from '../contexts/Auth';
import useDocumentTitle from '../handleTitle';
import Feed from './Feed';
import Welcome from './~site/Welcome';

export default function Home() {
	const { currentUser } = useAuth()
	useDocumentTitle("SociaPen")
	return currentUser ? <Feed /> : <Welcome/>
}
