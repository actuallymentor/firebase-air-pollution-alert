// Grab styles
import styles from '../css/styles.scss'

// IMport local firebase wrapper
import fb from './modules/firebase'

// Import ajax proise module
import pollution from './modules/pollution-api'

// Shortcuts ( probably make these into modules )
import doc from './modules/doc'

// pollution.city( 'Amsterdam' ).then( console.log.bind( console ) )

window.addEventListener( 'load', f => {

	// Add listener for the login switch
	doc.id( 'switchlogin' ).addEventListener( 'click', event => {
		event.preventDefault( )
		if ( doc.id( 'login' ).value == 'login' ) {
			doc.id( 'login' ).value = 'register'
			doc.id( 'switchlogin' ).innerHTML = 'Or login...'
		} else {
			doc.id( 'login' ).value = 'login'
			doc.id( 'switchlogin' ).innerHTML = 'Or register...'
		}
	} )

	// Add a listener for clicks on the form
	doc.id( 'loginreg' ).addEventListener( 'submit', event => {
		event.preventDefault( )
		// Switch for when the form is submitted
		switch( doc.id( 'login' ).value ) {
			case 'login': 
				fb.login( doc.val( 'email' ), doc.val( 'password' ) )
				.then( f => fb.user = fb.auth().currentUser )
				.then( f => doc.id( 'loginreg' ).classList.add( 'hide' ) )
				.then( f => doc.id( 'title' ).innerHTML = `Welcome back ${fb.user.email}` )
			break
			case 'register':
				fb.register( doc.val( 'email' ), doc.val( 'password' ) )
				.then( f => doc.id( 'loginreg' ).classList.add( 'hide' ) )
			break
		}
	} )
} )