import React from 'react';
import useDocumentTitle from '../handleTitle';
import './css/Pen.css';
import { fdb } from '../App';
import { useParams } from 'react-router-dom';
import * as firebaseFirestore from 'firebase/firestore';
import RenderMascot from '../assets/img/RenderMascot';
import Loader from './~site/Loader';

function isURL(url) {
	return new RegExp(/^(ftp|http|https):\/\/[^ "]+$/).test(url)
}

export default function Pen() {
	useDocumentTitle("SociaPen | Pen")
	const [loading, setLoading] = React.useState(true)
	const [pen, setPen] = React.useState(null)
	const [author, setAuthor] = React.useState(null)
	const { penid } = useParams()
	React.useEffect(() => {
		const penDocument = firebaseFirestore.doc(firebaseFirestore.collection(fdb, 'pens'), penid)
		return firebaseFirestore.onSnapshot(penDocument, (penDocSnap) => {
			if (penDocSnap.exists()) {
				const penData = penDocSnap.data()
				penData.id = penDocSnap.id
				penData.timestamp = new Date(penData.timestamp.toDate()) ?? new Date()
				setPen(penData)
				const userDocRef = firebaseFirestore.doc(firebaseFirestore.collection(fdb, 'users'), penData.user)
				firebaseFirestore.onSnapshot(userDocRef, (userDocSnap) => {
					setAuthor(userDocSnap.data())
					setLoading(false)
				})
			} else {
				setPen(null)
				setAuthor(null)
				setLoading(false)
			}
		})
	}, [])

	if (loading) return <Loader />
	else if (pen == null) { return (
			<div className='sociapen-App-window'>
				Cannot find this Pen :(
			</div>
	)
	} else {
		return (
		<div className='sociapen-App-window'>
			{String(loading)}<br />
			{author ? author.name : null}<br />
			{pen.timestamp.toString()}<br />
			{isURL(author.photo) ? 
				<img referrerPolicy="no-referrer" src={author.photo} /> :
				<RenderMascot color={author.photo}/>
			}
		</div>
	)}
}
