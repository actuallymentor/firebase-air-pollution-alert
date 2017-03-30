// Import firebase
import fb from 'firebase'

// Import secrets etc
import secrets from './public-secrets'

// I am profoundly unconfortable having an API key in my frontend code...
fb.initializeApp( secrets.fb )

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


export default fb