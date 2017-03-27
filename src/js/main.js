// Grab styles
import styles from '../css/styles.scss'

// Import firebase
import firebase from 'firebase'

firebase.initializeApp( {
	apiKey: process.env.apiKey,
	authDomain: process.env.authDomain,
	databaseURL: process.env.databaseURL,
	storageBucket: process.env.storageBucket,
	messagingSenderId: process.env.messagingSenderId
} )