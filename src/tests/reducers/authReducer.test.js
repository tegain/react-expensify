import authReducer from '../../reducers/authReducer'

test('should set uid for login', () => {
	const uid = '123-abc'
	const action = {
		type: 'LOGIN',
		uid
	}
	const state = authReducer({}, action)
	expect(state.uid).toBe(uid)
})

test('should clear uid for logout', () => {
	const action = {
		type: 'LOGOUT'
	}
	const state = authReducer({ uid: 'any-uid' }, action)
	expect(state).toEqual({})
})