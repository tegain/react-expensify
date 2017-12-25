/**
 * SET_TEXT_FILTER Action generator
 * @param text
 * @returns {{type: string, text: string}}
 */
export const setTextFilter = (text = '') => ({
	type: 'SET_TEXT_FILTER',
	text
})

/**
 * SORT_BY_AMOUNT Action generator
 * @returns {{type: string}}
 */
export const sortByAmount = () => ({
	type: 'SORT_BY_AMOUNT'
})

/**
 * SORT_BY_DATE Action generator
 * @returns {{type: string}}
 */
export const sortByDate = () => ({
	type: 'SORT_BY_DATE'
})

/**
 * SET_START_DATE Action generator
 * @param startDate
 * @returns {{type: string, startDate: *}}
 */
export const setStartDate = (startDate) => ({
	type: 'SET_START_DATE',
	startDate
})

/**
 * SET_END_DATE Action generator
 * @param endDate
 * @returns {{type: string, endDate: *}}
 */
export const setEndDate = (endDate) => ({
	type: 'SET_END_DATE',
	endDate
})