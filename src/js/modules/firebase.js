// Import firebase
import fb from 'firebase/app'
import auth from 'firebase/auth'
import db from 'firebase/database'
fb.auth = auth
fb.db = db

// I am profoundly unconfortable having an API key in my frontend code...
fb.initializeApp( {
	apiKey: apiKey,
    authDomain: authDomain,
    databaseURL: databaseURL,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId
} )

fb.register = ( email, password ) => fb.auth().createUserWithEmailAndPassword(email, password)
fb.login = ( email, password ) => fb.auth().signInWithEmailAndPassword(email, password)
fb.db = fb.database( )
fb.getUser = f => {
	return new Promise( ( resolve, reject ) => {
		fb.auth( ).onAuthStateChanged( user => {
			user ? resolve( user ) : reject( user )
		} )
	} )
}
fb.setData = data => {
	return fb.getUser( )
	.then( user => {
		return fb.db.ref( `users/${user.uid}` ).set( data )
	} )
}
fb.getData = f => {
	return fb.getUser( )
	.then( user => {
		return fb.db.ref( `users/${user.uid}` ).once( 'value' )
	} )
	.then( snapshot => {
		return snapshot.val( )
	} )
}
fb.update = data => {
	return fb.getUser( )
	.then( user => {
		return fb.db.ref( `users/${user.uid}` ).update( data )
	} )
}


export default fb