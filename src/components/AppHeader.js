import React from 'react'
import { NavLink } from 'react-router-dom'

const AppHeader = () => (
	<header>
		<h1>Expensify</h1>
		<ul>
			<li><NavLink to="/" activeClassName="is-active" exact={true}>Dashboard</NavLink></li>
			<li><NavLink to="/create" activeClassName="is-active">Add new expense</NavLink></li>
			<li><NavLink to="/help" activeClassName="is-active">Help</NavLink></li>
		</ul>
	</header>
)

export default AppHeader