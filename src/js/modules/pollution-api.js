// Get ajax
import ajax from './ajax'

const citypollution = city => {
	return new Promise( ( resolve, reject ) => {
		ajax( 'GET', `//api.waqi.info/feed/${city}/?token=${aqicn}` )
		.then( JSON.parse )
		.then( resolve )
		.catch( reject )
	} )
}

const coordinatespollution = ( lat, lng ) => {
	return new Promise( ( resolve, reject ) => {
		ajax( 'GET', `//api.waqi.info/feed/geo:${lat};${lng}/?token=${aqicn}` )
		.then( JSON.parse )
		.then( resolve )
		.catch( reject )
	} )
}

const pollution = {
	city: citypollution,
	coords: coordinatespollution
}

export default pollution