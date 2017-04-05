const doc = {
	u: document,
	id: id => document.getElementById( id ),
	class: cls => document.getElementsByClassName( cls ),
	val: id => document.getElementById( id ).value
}

export default doc