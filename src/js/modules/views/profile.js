import fb from '../firebase'
import doc from '../doc'
import * as login from './login'
import * as loader from './loader'

// Update the user object
const updateuser = user => {
	return user.updateProfile( {
		displayName: doc.val( 'profilename' ),
		email: doc.val( 'profileemail' )
	} ).then( console.log.bind( console ) )
}

// Update the location
const updatelocation = user => {
	return fb.db
	.ref( `users/${user.uid}` )
	.set( {
		location: doc.val( 'profilelocation' )
	} ).then( console.log.bind( console ) )
}

export const render = f => {
	return Promise.resolve()
	.then( login.hide )
	.then( loader.show )
	.then( f => doc.id( 'title' ).innerHTML = `Profile` )
	.then( f => {
		return fb.getUser( )
	} )
	.then( user => {
		doc.id( 'profilename' ).value = user.displayName || ''
		doc.id( 'profileemail' ).value = user.email || ''
		return fb.db.ref( `users/${user.uid}` ).once( 'value' )
	} )
	.then( snapshot => doc.id( 'profilelocation' ).value = snapshot.val( ).location || '' )
	.then( loader.hide )
	.then( show )
}

// Visually display errors to the user
const displayerror = err => {
	console.log( err )
	doc.id( 'error' ).innerHTML = err
}

export const init = f => {
	// Handle submit events on the profile form ( saving changes )
	doc.id( 'profile' ).addEventListener( 'submit', event => {
		console.log( 'Form submitted' )
		event.preventDefault( )
		Promise.resolve( hide( ) )
		.then( loader.show )
		.then( f => fb.getUser( ) )
		.then( user => Promise.all( [ updateuser( user ), updatelocation( user ) ] ) )
		.then( loader.hide )
		.then( show )
		.then( alert( 'Changes saved!' ) )
		.catch( displayerror )
	} )
	// Handle clicks on the logout button
	doc.id( 'logoutbutton' ).addEventListener( 'click', event => {
		event.preventDefault( )
		fb.auth( ).signOut( )
		.then( hide )
		.then( f => doc.id( 'title' ).innerHTML = `Air Pollution Alert` )
		.then( login.show )
		.catch( displayerror )
	} )
}

export const show = f => {
	doc.id( 'profile' ).classList.remove( 'hide' )
}

export const hide = f => {
	doc.id( 'profile' ).classList.add( 'hide' )
}