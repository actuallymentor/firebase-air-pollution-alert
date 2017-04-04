// Grab styles
import styles from '../css/styles.scss'

// IMport local firebase wrapper
import fb from './modules/firebase'

// Import ajax proise module
// import pollution from './modules/pollution-api'

// Shortcuts ( probably make these into modules )
// import doc from './modules/doc'

// Import the login flow
import * as login from './modules/views/login'

// Import profile flow
import * as profile from './modules/views/profile'

// Import loading spinner
import * as loader from './modules/views/loader'

console.log( apiKey )

window.addEventListener( 'load', f => {

	// Initialise listeners
	login.init( )
	profile.init( )

	// Render profile if user is logged in
	fb.getUser( )
	.then( loader.hide )
	.then( profile.render )
	.catch( f => {
		loader.hide( )
		login.show( )
	} )

} )