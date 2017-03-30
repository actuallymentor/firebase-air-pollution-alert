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

window.addEventListener( 'load', f => {

	// Initialise listeners
	login.init( )
	profile.init( )

	// Render profile if user is logged in
	fb.getUser( )
	.then( profile.render )
	.catch( login.show )

} )