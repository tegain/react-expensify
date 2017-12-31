import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk'
import expensesReducer from '../reducers/expensesReducer'
import filtersReducer from '../reducers/filtersReducer'
import authReducer from '../reducers/authReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

/**
 * A thunk is a function that wraps an expression to delay its evaluation.
 */
export default () => {
	const store = createStore(
		combineReducers({
			auth: authReducer,
			expenses: expensesReducer,
			filters: filtersReducer
		}),
		composeEnhancers(applyMiddleware(thunk))
	)

	return store
}

