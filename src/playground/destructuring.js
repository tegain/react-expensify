/**
 * Object ES6 destructuring
 *
 * Objects destructure with properties names
 *
 * @type {{name: string, age: number, location: {city: string, temp: number}}}
 */

const person = {
	name: 'Thomas',
	age: 28,
	location: {
		city: 'Lille',
		temp: 5
	}
}

// ES6 destructuration

// Pattern:
// const { name = 'defaultValue', age: renamedVar } = person
// const { name: firstName = 'defaultValue', age } = person (we can chain)

// Declare an object variable with the object properties names inside
// ex: { name, age} -> person.name, person.age
// It's also possible to rename the local variables:
// const { name, age: newAgeName } = person
// 'name' thus becomes undefined, because we renamed it
const { name, age } = person
console.log(`${name} is ${age}.`)


// if (person.location.city && person.location.temp) {
// 	console.log(`It's ${person.location.temp}°C in ${person.location.city}`)
// }
//
// Same as :
// const { city, temp: temperature } = person.location
// if (city && temperature) {
// 	console.log(`It's ${temperature}°C in ${city}`)
// }

// Challenge:
// Make `console.log(publisherName)` work
// If publisher name exists, take it, otherwise use 'Self-published' as default
const book = {
	title: 'Ego is the enemy',
	author: 'Ryan Holiday',
	publisher: {
		name: 'Penguin'
	}
}
const { name: publisherName = 'Self-published' } = book.publisher
console.log(`The book's publisher is ${publisherName}`)


/**
 * ES6 Array destructuring
 *
 * Arrays destructure with array item position (unlike Objects)
 *
 * @type {Array}
 */

const address = [
	'1299 S Juniper Street',
	'Philadelphia',
	'Pennsylvania',
	'19147'
]
// const [street, city, state, zip] = address
// const [, city, state] = address // Only set variables to items wanted (leave the comma for the first item). the last item isn't needed
// const [, , state] = address // if only the 3rd item is wanted. Etc...
const [, city = 'New York', state] = address // We can also set default value if index doesn't exist in array
console.log(`You are in ${city} ${state}`)

// Challenge
// Print: 'A medium Coffee (hot) costs $2.50'
// Grab 1st and 3rd items using destructuring
const item = [
	'Coffee (hot)',
	'$2.00',
	'$3.50',
	'$5.75'
]
const [coffee, , mdPrice] = item
console.log(`A medium ${coffee} costs ${mdPrice}.`)
