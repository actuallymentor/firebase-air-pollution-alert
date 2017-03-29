const ajax = ( type, url, data ) => {
	return new Promise( ( resolve, reject ) => {
		const request = new XMLHttpRequest( )
		// Listen to connection changes
		request.onreadystatechange =  f => {
			// If success, resolve with response
			if( request.readyState == 4 && request.status == 200 ) return resolve( request.responseText )
			if( request.readyState == 4 && request.status != 200 ) return reject( request.responseText )
		}
		// Reject if the request times out
		request.ontimeout = f => {
			return reject( 'timeout' )
		}

		// Open request async = true
		request.open( type, url, true )
		// Send data if it was specified
		data ? request.send( data ) : request.send(  )
	} )
}

export default ajax