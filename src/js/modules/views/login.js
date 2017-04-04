import fb from '../firebase'
import doc from '../doc'
import { render as renderprofile } from './profile'
import * as loader from './loader'

// Visually display errors to the user
const displayerror = err => {
	doc.id( 'error' ).innerHTML = err
}

export const init = f => {
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
		// Hide the form and add the loader
		hide( )
		loader.show( )
		// Switch for when the form is submitted
		switch( doc.id( 'login' ).value ) {
			case 'login': 
				fb.login( doc.val( 'email' ), doc.val( 'password' ) )
				.then( renderprofile )
				.catch( displayerror )
			break
			case 'register':
				fb.register( doc.val( 'email' ), doc.val( 'password' ) )
				.then( renderprofile )
				.catch( displayerror )
			break
		}
	} )
}

export const hide = f => {
	doc.id( 'loginreg' ).classList.add( 'hide' )
}

export const show = f => {
	doc.id( 'loginreg' ).classList.remove( 'hide' )
}