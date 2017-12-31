import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { startLogout } from "../actions/authActions";

export const AppHeader = ({ startLogout }) => (
	<header>
		<h1>Expensify</h1>
		<ul>
			<li><NavLink to="/dashboard" activeClassName="is-active">Dashboard</NavLink></li>
			<li><NavLink to="/create" activeClassName="is-active">Add new expense</NavLink></li>
			<li><button onClick={startLogout}>Logout</button></li>
		</ul>
	</header>
)

const mapDispatchToProps = (dispatch) => ({
	startLogout: () => dispatch(startLogout())
})


export default connect(undefined, mapDispatchToProps)(AppHeader)