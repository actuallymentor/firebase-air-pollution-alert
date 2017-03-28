// Grab styles
import styles from '../css/styles.scss'

// Import firebase
import firebase from 'firebase'

// Shortcuts ( probably make these into modules )
const doc = {
	u: document,
	id: id => document.getElementById( id ),
	val: id => document.getElementById( id ).value
}
const fb = {
	register: ( email, password ) => firebase.auth().createUserWithEmailAndPassword(email, password).catch( console.log.bind( console ) ),
	login: ( email, password ) => firebase.auth().signInWithEmailAndPassword(email, password).catch( console.log.bind( console ) )
}


// I am profoundly unconfortable having an API key in my frontend code...
firebase.initializeApp( {
    apiKey: "AIzaSyBew13bLI-FFAnm3rSfggikpw8AYIjz_-I",
    authDomain: "playground-20814.firebaseapp.com",
    databaseURL: "https://playground-20814.firebaseio.com",
    storageBucket: "playground-20814.appspot.com",
    messagingSenderId: "741236078934"
} )

const db = firebase.database( )

window.addEventListener( 'load', f => {
	
	doc.id( 'loginreg' ).addEventListener( 'click', event => {
		switch( event.target.id ) {
			case 'login': 
				fb.login( doc.val( 'email' ), doc.val( 'password' ) )
				.then( f => fb.user = firebase.auth().currentUser )
				.then( f => doc.id( 'loginreg' ).innerHTML = `You have been logged in as ${fb.user.email}` )
			break
			case 'register':
				fb.register( doc.val( 'email' ), doc.val( 'password' ) )
				.then( f => fb.user = firebase.auth().currentUser )
				.then( f => doc.id( 'loginreg' ).innerHTML = `You registered as ${fb.user.email}` )
			break
		}
	} )
} )