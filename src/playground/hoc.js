// Higher Order Component (HOC):
// A component (HOC) that renders another component
//
// Reuse code
// Render hijacking
// Prop manipulation
// Abstract state

import React from 'react'
import ReactDOM from 'react-dom'

// Regular non-HOC component
const Info = (props) => (
	<div>
		<h1>Info</h1>
		<p>The detail is: {props.detail}</p>
	</div>
)

// Build a HOC Component:
// const hocBuildFunction = (RegularWrappedComponent) => {
// 	return (props) => (
// 		<div>
// 			<p>Manipulated reusable part</p>
// 			<RegularWrappedComponent />
// 		</div>
// 	)
// }
// const HocComponentName = hocBuildFunction(RegularComponent)

// HOC wraps a component to manipulate it
const withAdminWarning = (WrappedComponent) => {
	return (props) => (
		<div>
			{props.isAdmin && <p>This is a warning, only appearing on AdminInfo component</p>}
			<WrappedComponent {...props} /> {/* spread props to get the ones from the component render function */}
		</div>
	)
}
const AdminInfo = withAdminWarning(Info)

// requireAuthentification
const requireAuthentification = (WrappedComponent) => {
	return (props) => (
		<div>
			{
				props.isAuthenticated ?
					(
						<WrappedComponent {...props} />
					) : (
						<p>Please log in to view the content</p>
					)
			}
		</div>
	)
}
const AuthInfo = requireAuthentification(Info)

// ReactDOM.render(<AdminInfo isAdmin={true} detail="This is a detail" />, document.getElementById('root'))
ReactDOM.render(<AuthInfo isAuthenticated={true} detail="This is a detail" />, document.getElementById('root'))
