import * as firebase from 'firebase'

const config = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.FIREBASE_DATABASE_URL,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
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

export { firebase, db as default }