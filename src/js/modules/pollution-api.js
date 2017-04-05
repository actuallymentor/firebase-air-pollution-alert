// Get ajax
import ajax from './ajax'

export const city = city => {
	return new Promise( ( resolve, reject ) => {
		ajax( 'GET', `//api.waqi.info/feed/${city}/?token=${aqicn}` )
		.then( JSON.parse )
		.then( resolve )
		.catch( reject )
	} )
}

export const coordinates = ( lat, lng ) => {
	return new Promise( ( resolve, reject ) => {
		ajax( 'GET', `//api.waqi.info/feed/geo:${lat};${lng}/?token=${aqicn}` )
		.then( JSON.parse )
		.then( resolve )
		.catch( reject )
	} )
}

export const translate = aqi => {
	// Source https://en.wikipedia.org/wiki/Air_quality_index
	if ( aqi < 50 ) return 'excellent, no health implications'
	if ( aqi < 100 ) return 'reasonable, hypersensitive individuals take care'
	if ( aqi < 150 ) return 'lightly polluted, slight irritations may occur'
	if ( aqi < 200 ) return 'moderately polluted, slight irritations may occur'
	if ( aqi < 300 ) return 'heavily polluted, health noticeably affected'
	if ( aqi < 50 ) return 'severely polluted, health noticeably affected'
}

export const validate = city => {
	return new Promise( ( resolve, reject ) => {
		ajax( 'GET', `//api.waqi.info/feed/${city}/?token=${aqicn}` )
		.then( JSON.parse )
		.then( data => {
			if ( data.status == 'ok' ) return resolve( data )
			return reject( `We have no air quality data on ${city}, try another nearby place?` )
		} )
	} )
}