import fb from '../firebase'
import doc from '../doc'
import * as login from './login'
import * as loader from './loader'
import * as pollution from '../pollution-api'

// Update the user object
const updateuser = user => {
	return user.updateProfile( {
		displayName: doc.val( 'profilename' ),
		email: doc.val( 'profileemail' )
	} )
}

// Update the location
const updatelocations = f => {
	if ( !doc.val( 'addcity' ) ) return 
	return pollution.validate( doc.val( 'addcity' ) )
	.then( f => {
		return fb.getData( )
	} )
	.then( data => {
		if ( data && doc.val( 'addcity' ).length > 0 ) data.locations ? data.locations.push( doc.val( 'addcity' ) ) : data.locations = [ doc.val( 'addcity' ) ]
		if ( !data && doc.val( 'addcity' ).length > 0 ) data = { locations: [ doc.val( 'addcity' ) ] }
		return fb.setData( data )
	} )
	.then( f =>  Array.prototype.map.call( doc.class( 'locationwrapper' ), city => city.remove( ) ) )
	.then( f => doc.id( 'addcity' ).value = '' )
}
const updatealertpreferences = f => {
	return fb.update( { frequency: document.querySelector('input[name="alertfrequency"]:checked').value || '' } )
}

const generateCityList = city => {
	
	// Create a random string
	let random = Math.random().toString(36).substr(2, 25)
	// Create the input field
	let wrapper = document.createElement( 'div' )
	wrapper.setAttribute( 'class', 'fillwidth locationwrapper' )
	let listcity = document.createElement( 'input' )
	listcity.setAttribute( 'type', 'text' )
	listcity.setAttribute( 'value', city )
	listcity.setAttribute( 'class', 'profilecity' )
	listcity.setAttribute( 'id', random )
	listcity.disabled = true
	wrapper.append( listcity )
	// Create a corresponding label
	let deletelabel = document.createElement( 'a' )
	deletelabel.setAttribute( 'href', random )
	deletelabel.setAttribute( 'class', 'deletelabel' )
	deletelabel.innerHTML = 'delete'
	deletelabel.addEventListener( 'click', event => {
		event.preventDefault( )
		deletelocation( event.target.getAttribute( 'href' ) )
	} )
	wrapper.append( deletelabel )
	// Append the input with the label
	doc.id( 'locations' ).prepend( wrapper )
}

const displaypollution = f => {
	// Get the data
	return fb.getData( )
	.then( data => {
		if ( !data.locations ) return []
		return Promise.all( data.locations.map(
			city => {
				return pollution.city( city )
				.then( res => {
					if ( res.status != 'ok' ) throw `We have no data on ${city}, please remove it from your list`
					return res
				} )
			}
		) )
	} )
	.then( pollutionresults => {
		doc.id( 'message' ).innerHTML = ''
		let pollutionul = document.createElement( 'ul' )
		for (var i = pollutionresults.length - 1; i >= 0; i--) {
			if ( pollutionresults[i].status != 'ok' ) throw pollutionresults[i].data
			let citydata = document.createElement( 'li' )
			citydata.innerHTML = `AQI in <b>${ pollutionresults[i].data.city.name }</b>: ${ pollutionresults[i].data.aqi }.<br><i>This is ${pollution.translate( pollutionresults[i].data.aqi )}.</i>`
			pollutionul.append( citydata )
		}
		return doc.id( 'message' ).append( pollutionul )
	} )
}

const deletelocation = id => {
	let city = doc.val( id )
	// Grab user data
	fb.getData( )
	// Remove the clicked element from the data in the database
	.then( data => {
		if ( data.locations.indexOf( city ) != -1 ) data.locations.splice( data.locations.indexOf( city ), 1 )
		return data
	} )
	// Send the new data to the database
	.then( newdata => {
		return fb.setData( newdata )
	} )
	// Remove the visible element
	.then( f => {
		doc.id( id ).parentNode.remove( )
	} )
	.then( doc.id( 'message' ).innerHTML = '' )
	.then( displaypollution )
}

export const render = f => {
	return Promise.resolve()
	.then( login.hide )
	.then( loader.show )
	.then( f => doc.id( 'title' ).innerHTML = `Profile` )
	.then( f => fb.getUser( ) )
	.then( user => {
		doc.id( 'profilename' ).value = user.displayName || ''
		doc.id( 'profileemail' ).value = user.email || ''
		return fb.getData( )
	} )
	.then( data => {
		if ( data ) { 
			if ( data.locations ) data.locations.length > 0 ? data.locations.map( city => generateCityList( city ) ) : false
			if ( data.frequency ) doc.id( data.frequency ).checked = true
		 }
	} )
	.then( show )
	.then( displaypollution )
	.then( loader.hide )
	.catch( displayerror )
}

// Visually display errors to the user
const displayerror = err => {
	console.log( err )
	doc.id( 'error' ).innerHTML = err
}
const clearerror = f => { doc.id( 'error' ).innerHTML = '' }

export const init = f => {
	// Handle submit events on the profile form ( saving changes )
	doc.id( 'profile' ).addEventListener( 'submit', event => {
		event.preventDefault( )
		Promise.resolve( hide( ) )
		.then( loader.show )
		.then( f => fb.getUser( ) )
		.then( user => Promise.all( [ updateuser( user ), updatelocations( ), updatealertpreferences( ) ] ) )
		.then( loader.hide )
		.then( reset )
		.then( show )
		.then( render )
		.catch( err => {
			reset( )
			displayerror( err )
			loader.hide( )
			show( )
			render( )
		} )
	} )
	// Handle clicks on the logout button
	doc.id( 'logoutbutton' ).addEventListener( 'click', event => {
		event.preventDefault( )
		fb.auth( ).signOut( )
		.then( hide )
		.then( reset )
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

export const reset = f => {
	// Remove all location inputs
	let listed = doc.class( 'locationwrapper' )
	for (var i = listed.length - 1; i >= 0; i--) {
		listed[i].remove( )
	}
	doc.id( 'profilename' ).value = ''
	doc.id( 'profileemail' ).value = ''
	doc.id( 'message' ).innerHTML = ''
	doc.id( 'error' ).innerHTML = ''
}