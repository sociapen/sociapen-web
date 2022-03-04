import React from "react";
import useDocumentTitle from "../../handleTitle";
import './css/PageNotFound.css';

export default function PageNotFound() {
	useDocumentTitle("SociaPen")
	return (
		<div className="sociapen-App-pageNotFound">
			<h1>Page not found :(</h1>
		</div>
	)
}