// Import firebase
import fb from 'firebase'

// Import secrets etc
import secrets from './public-secrets'

// I am profoundly unconfortable having an API key in my frontend code...
fb.initializeApp( secrets.fb )

fb.register = ( email, password ) => fb.auth().createUserWithEmailAndPassword(email, password).catch( console.log.bind( console ) )
fb.login = ( email, password ) => fb.auth().signInWithEmailAndPassword(email, password).catch( console.log.bind( console ) )
fb.db = fb.database( )


export default fb