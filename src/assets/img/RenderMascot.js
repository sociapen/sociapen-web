import React from "react";

export default function RenderMascot({ color, unregistered = false }) {
	if (color === '' || color === null || color === undefined || color === false) color = 'var(--theme-color)';
	if (unregistered) {
		return (
			<svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
				<g clipPath="url(#sociapen_auth_clip_unregistered)">
					<rect width="500" height="500"/>
					<circle cx="250" cy="273" r="150" fill="black"/>
					<ellipse cx="250" cy="550" rx="250" ry="150" fill="black"/>
					<path d="M262.441 339.16H227.578C227.669 330.957 228.307 323.893 229.492 317.969C230.768 311.953 232.91 306.53 235.918 301.699C239.017 296.868 243.118 292.083 248.223 287.344C252.507 283.516 256.243 279.87 259.434 276.406C262.624 272.943 265.13 269.388 266.953 265.742C268.776 262.005 269.688 257.858 269.688 253.301C269.688 248.014 268.867 243.639 267.227 240.176C265.677 236.621 263.307 233.932 260.117 232.109C257.018 230.286 253.099 229.375 248.359 229.375C244.44 229.375 240.794 230.241 237.422 231.973C234.049 233.613 231.27 236.165 229.082 239.629C226.986 243.092 225.892 247.65 225.801 253.301H186.152C186.426 240.814 189.297 230.514 194.766 222.402C200.326 214.199 207.754 208.138 217.051 204.219C226.348 200.208 236.784 198.203 248.359 198.203C261.12 198.203 272.057 200.299 281.172 204.492C290.286 208.594 297.259 214.655 302.09 222.676C306.921 230.605 309.336 240.267 309.336 251.66C309.336 259.59 307.786 266.654 304.688 272.852C301.589 278.958 297.533 284.655 292.52 289.941C287.507 295.228 281.992 300.697 275.977 306.348C270.781 310.996 267.227 315.872 265.312 320.977C263.49 326.081 262.533 332.142 262.441 339.16ZM223.477 381.406C223.477 375.573 225.482 370.742 229.492 366.914C233.503 362.995 238.88 361.035 245.625 361.035C252.279 361.035 257.611 362.995 261.621 366.914C265.723 370.742 267.773 375.573 267.773 381.406C267.773 387.057 265.723 391.842 261.621 395.762C257.611 399.681 252.279 401.641 245.625 401.641C238.88 401.641 233.503 399.681 229.492 395.762C225.482 391.842 223.477 387.057 223.477 381.406Z" fill="white"/>
				</g>
				<defs>
					<clipPath id="sociapen_auth_clip_unregistered">
						<rect width="500" height="500" fill="black"/>
					</clipPath>
				</defs>
			</svg>
		)
	}
	return (
		<svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g clipPath="url(#sociapen_auth_clip_mascot)">
				<rect width="500" height="500"/>
				<circle cx="250" cy="273" r="150" fill={color}/>
				<ellipse cx="250" cy="550" rx="250" ry="150" fill={color}/>
				<path d="M144.5 240C145.667 224.333 174.4 214.7 190 233.5" stroke="white" strokeWidth="10"/>
				<path d="M301.777 235.146C306.044 220.026 336.121 216.315 347.659 237.848" stroke="white" strokeWidth="10"/>
				<path d="M273.115 324.151C270.182 339.585 240.543 345.903 227.172 325.458" stroke="white" strokeWidth="10"/>
			</g>
			<defs>
				<clipPath id="sociapen_auth_clip_mascot">
					<rect width="500" height="500" fill="black"/>
				</clipPath>
			</defs>
		</svg>
	)
}