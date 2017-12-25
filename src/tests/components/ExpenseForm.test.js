import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'
import expenses from '../fixtures/expenses'
import ExpenseForm from '../../components/ExpenseForm'

/**
 * Need to mock 'moment' library in order to override the 'moment()' called in the datepicker in the component,
 * which always returns a different time
 */
test('should render ExpenseForm correctly', () => {
	const wrapper = shallow(<ExpenseForm />)
	expect(wrapper).toMatchSnapshot()
})

// should render ExpenseForm with expense data
test('should render ExpenseForm with expense data', () => {
	const wrapper = shallow(<ExpenseForm expense={expenses[1]} />)
	expect(wrapper).toMatchSnapshot()
})

test('should render error message for invalid form submission', () => {
	const wrapper = shallow(<ExpenseForm />)
	expect(wrapper).toMatchSnapshot() // Pre-event snapshot
	wrapper.find('form').simulate('submit', {
		// Need to redefined e.preventDefault to avoid
		// `TypeError: Cannot read property 'preventDefault' of undefined` error
		preventDefault: () => {}
	})
	// @doc https://facebook.github.io/jest/docs/en/expect.html#tobegreaterthanorequalnumber
	expect(wrapper.state('error').length).toBeGreaterThanOrEqual(1)
	expect(wrapper).toMatchSnapshot() // After-event snapshot
})

test('should set description on input change', () => {
	const value = 'New description'
	const wrapper = shallow(<ExpenseForm />)
	wrapper.find('input').at(0).simulate('change', {
		target: { value } // Redefine e.target.value object
	})
	expect(wrapper.state('description')).toBe(value)
})

test('should set note on textarea change', () => {
	const value = 'New expense note'
	const wrapper = shallow(<ExpenseForm />)
	wrapper.find('textarea').simulate('change', {
		target: { value }
	})
	expect(wrapper.state('note')).toBe(value)
})

test('should set amount if valid input', () => {
	const value = '12.50'
	const wrapper = shallow(<ExpenseForm />)
	wrapper.find('input').at(1).simulate('change', {
		target: { value }
	})
	expect(wrapper.state('amount')).toBe(value)
})

test('should not set amount if invalid value', () => {
	const value = '12.133'
	const wrapper = shallow(<ExpenseForm />)
	wrapper.find('input').at(1).simulate('change', {
		target: { value }
	})
	expect(wrapper.state('amount')).toBe('')
})

test('should submit ExpenseForm with correct data', () => {
	const onSubmit = jest.fn()
	const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmit} />)
	wrapper.find('form').simulate('submit', {
		preventDefault: () => {}
	})
	expect(wrapper.state('error')).toBe(undefined)
	// @doc https://facebook.github.io/jest/docs/en/expect.html#tohavebeencalledwitharg1-arg2-
	expect(onSubmit).toHaveBeenLastCalledWith({
		description: expenses[0].description,
		amount: expenses[0].amount,
		note: expenses[0].note,
		createdAt: expenses[0].createdAt
	})
})

test('should set new date on date change', () => {
	const now = moment()
	const wrapper = shallow(<ExpenseForm />)
	// See snaspshot file for datepicker name
	// Calling prop('name') gives back the handler, so we can pass the data after
	wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now)
	expect(wrapper.state('createdAt')).toEqual(now) // toEqual() because moment is an object
})

test('should set calendar focus on change', () => {
	const focused = true
	const wrapper = shallow(<ExpenseForm />)
	wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({ focused })
	expect(wrapper.state('calendarFocused')).toBe(focused)
})