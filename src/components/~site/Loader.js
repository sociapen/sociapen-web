import React from 'react';
import './css/Loader.css';

export default function Loader() {
  return (
	<div className='sociapen-App-loader'>
		<div className="sociapen-App-loader-spinner" style={{ width: '70vmin', height: '70vmin' }}>
			<div className="sociapen-App-loader-spinner" style={{animationDirection: 'reverse'}}/>
		</div>
	</div>
  )
}