import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter, { history } from './routers/AppRouter'
import { firebase } from './firebase/firebase'
import configureStore from './store/configureStore'
import { startSetExpenses } from './actions/expensesActions'
import { login, logout } from './actions/authActions'
import LoadingPage from './components/LoadingPage'
import 'normalize.css/normalize.css'
import './styles/styles.scss'
import 'react-dates/lib/css/_datepicker.css'

const store = configureStore()

/**
 *  Provides the store to all the components
 *  Must be used in order to use connect() in hierarchy components
 */
const jsx = (
	<Provider store={store}>
		<AppRouter />
	</Provider>
)

/**
 * Only render the app if it's not already rendered
 * @type {boolean}
 */
let hasRendered = false
const renderApp = () => {
	if (!hasRendered) {
		ReactDOM.render(jsx, document.getElementById('root'))
		hasRendered = true
	}
}

ReactDOM.render(<LoadingPage />, document.getElementById('root'))

// Access Firebase Auth service,
// Watch Auth state change
firebase.auth().onAuthStateChanged((user) => {
	// After Login
	if (user) {
		/**
		 * Dispatch login() and logout() here, instead of dispatching them inside startLogin() and startLogout()
		 * (like in other async actions), because this onAuthStateChanged callback will run
		 * when the user first visits the page.
		 * So this function triggers, and let us know if the user is logged in or logged out,
		 * and we can make sure the Redux store is up to date.
		 *
		 * If we dispatch them inside of the async `start...` actions, the values will only be sent
		 * when the user explicitly log in or log out (clicking on the button)
		 */
		store.dispatch(login(user.uid))

		// When fetching data from database is finished, display the app instead of loading message
		store.dispatch(startSetExpenses()).then(() => {
			renderApp()

			// Redirect user only if he's on Login page
			if (history.location.pathname === '/') {
				history.push('/dashboard')
			}
		})
	} else {
		// When logged out
		store.dispatch(logout())
		renderApp()
		history.push('/')
	}
})
