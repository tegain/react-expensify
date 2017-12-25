import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ExpenseDashboardPage from '../components/ExpenseDashboardPage'
import AddExpensePage from '../components/AddExpensePage'
import EditExpensePage from '../components/EditExpensePage'
import HelpPage from '../components/HelpPage'
import NotFoundPage from '../components/NotFoundPage'
import AppHeader from '../components/AppHeader'

const AppRouter = () => (
	/**
	 * <Switch> goes through all defined routes one at a time, and stops when finds a matching one.
	 * So, by not providing any 'path' prop, we can create a 404 route:
	 * Switch will display this component when no other route matches
	 */
	<BrowserRouter>
		<div> {/* BrowserRouter Expects single child */}
			<AppHeader />

			<Switch>
				<Route path="/" component={ExpenseDashboardPage} exact={true} /> {/* 'exact' required because the '/' matches all the routes... */}
				<Route path="/create" component={AddExpensePage} />
				<Route path="/edit/:id" component={EditExpensePage} />
				<Route path="/help" component={HelpPage} />
				<Route component={NotFoundPage} /> {/* path is optional */}
			</Switch>
		</div>
	</BrowserRouter>
)

export default AppRouter
