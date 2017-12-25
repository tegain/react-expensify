import { createStore } from 'redux'

// Action generators -> functions that return action objects
//
// Preferred than inline dispatch calls (avoid typos, etc)
// Use default object value for 'payload' to avoid calling property on undefined object,
// resulting in a `TypeError: cannot read property incrementBy of undefined`
//
// const incrementCount = (payload = {}) => ({ // using shorthand 'return' for returning only an object
// 	type: 'INCREMENT',
// 	incrementBy: typeof payload.incrementBy === 'number' ? payload.incrementBy : 1
// })
//
// Refactor:
// 1. Using Object destructuration: instead of providing 'payload.incrementBy', just provide the local variable from payload object
// 2. Set default value to { incrementBy = 1}
// 3. the resulting property is -> incrementBy: incrementBy
// 4. which can be shorthanded into `incrementBy`
const incrementCount = ({ incrementBy = 1 } = {}) => ({
	type: 'INCREMENT',
	incrementBy
})

const decrementCount = ({ decrementBy = 1 } = {}) => ({
	type: 'DECREMENT',
	decrementBy
})

const resetCount = () => ({
	type: 'RESET'
})

const setCount = ({ count }) => ({ // No need for default value because it is required
	type: 'SET',
	count
})

/**
 * createStore ( (state = default, action) => {} )
 *
 * When dispatching actions to the store,
 * decides which action to execute depending of the 'action.type' name,
 * using a switch statement (easier to read than if/else)
 * @type {Store<any>}
 */
/**
 * This is called a REDUCER
 *
 * 1. Reducers are pure functions: output is only determined by the input (nothing else from outside)
 * 2. Never change state or action
 *
 * @type {Store<any>}
 */
const countReducer = (state = { count: 0 }, action) => {
	switch (action.type) {
		case 'INCREMENT':
			return {
				count: state.count + action.incrementBy
			}
		case 'DECREMENT':
			return {
				count: state.count - action.decrementBy
			}
		case 'SET':
			return {
				count: action.count
			}
		case 'RESET':
			return {
				count: 0
			}
		default:
			return state
	}
}

const store = createStore(countReducer)

/**
 * store.subscribe () allows to watch for store changes
 * It takes a function that will run everytime the store is updated
 *
 * To stop subscribing, use the returned function of subscribe()
 * example:
 * const unsubscribe = store.subscribe(() => { do something... });
 * unsubscribe();
 */
const unsubscribe = store.subscribe(() => {
	console.log('store is updated', store.getState())
})

// Actions -> object that gets sent to the store
// store.dispatch({
// 	type: 'INCREMENT',
// 	incrementBy: 5
// })
store.dispatch(incrementCount({ incrementBy: 5 }))

store.dispatch(incrementCount())

store.dispatch(resetCount())

store.dispatch(decrementCount({ decrementBy: 3 }))

store.dispatch(decrementCount({ decrementBy: 10 }))

store.dispatch(setCount({ count: 150}))