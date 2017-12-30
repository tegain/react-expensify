import * as firebase from 'firebase'

const config = {
	apiKey: "AIzaSyCM05OeER6v-87L9ifBvyxGTCX4yPC-fPw",
	authDomain: "expensify-react-29c2b.firebaseapp.com",
	databaseURL: "https://expensify-react-29c2b.firebaseio.com",
	projectId: "expensify-react-29c2b",
	storageBucket: "expensify-react-29c2b.appspot.com",
	messagingSenderId: "729232816725"
}

firebase.initializeApp(config)

/**
 * - firebase.database() just access to the database method,
 * as it would with firebase.auth() for authentification methods
 *
 * - ref() is like mysql tables (if empty, references to the root of database)
 * - set() sets the value for the ref()
 */
const db = firebase.database()

db.ref().set({
	name: 'Thomas E',
	age: 28,
	isSingle: false,
	location: {
		city: 'Lille',
		country: 'France'
	}
})

/**
 * By default, Firebase overwrites data.
 * Example below removes all the previous data to only contain the `age` property
 */
// db.ref().set({
// 	age: 29
// })

/**
 * If we want to just update a value,
 * we have to pass it as a `ref()` argument
 */
// db.ref('age').set(29)
// db.ref('location/city').set('Vannes')


// db.ref('expenses').push({
// 	description: 'Rent',
// 	amount: '750',
// 	note: 'This is my note',
// 	createdAt: 1212150008644
// })


// Called at the begining, and at every database update
db.ref('expenses')
	.on('value', (snapshot) => {
		const expenses = []

		snapshot.forEach((child) => {
			expenses.push({
				id: child.key, // key is the unique key
				...child.val() // spread original expense value
			})
		})
		console.log(expenses)
	})

// Called ONLY when item get removed from database
db.ref('expenses')
	.on('child_removed', (snapshot) => {
		console.log(snapshot.key, snapshot.val())
	})

// Called only when item get updated
db.ref('expenses')
	.on('child_changed', (snapshot) => {
		console.log(snapshot.key, snapshot.val())
	})

// Actually also gets called for already existing items...
db.ref('expenses')
	.on('child_added', (snapshot) => {
		console.log(snapshot.key, snapshot.val())
	})


// db.ref('expenses')
// 	.once('value')
// 	.then((snapshot) => {
//
// 		/**
// 		 * Transform Firebase object into a javaascript array
// 		 * @doc https://firebase.google.com/docs/reference/js/firebase.database.DataSnapshot#forEach
// 		 * @doc https://firebase.google.com/docs/reference/js/firebase.database.DataSnapshot#key
// 		 * @type {Array}
// 		 */
// 		const expenses = []
// 		snapshot.forEach((childSnapshot) => {
// 			expenses.push({
// 				id: childSnapshot.key,
// 				...childSnapshot.val()
// 			})
// 		})
// 		console.log(expenses)
// 	})
