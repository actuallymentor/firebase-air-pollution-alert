import fb from '../firebase'
import doc from '../doc'
import { hide as hidelogin } from './login'

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
	.then( hidelogin )
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
	.then( show )
}

// Visually display errors to the user
const displayerror = err => {
	console.log( err )
	doc.id( 'error' ).innerHTML = err
}

export const init = f => {
	doc.id( 'profile' ).addEventListener( 'submit', event => {
		console.log( 'Form submitted' )
		event.preventDefault( )
		fb.getUser( )
		.then( user => {
			return Promise.all( [
				updateuser( user ),
				updatelocation( user )
			] )
		} )
		.then( f => { console.log.bind( console ) } )
		.catch( displayerror )
	} )
}

export const show = f => {
	doc.id( 'profile' ).classList.remove( 'hide' )
}

export const hide = f => {
	doc.id( 'profile' ).classList.add( 'hide' )
}