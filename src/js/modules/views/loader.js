import doc from '../doc'

export const hide = f => {
	doc.id( 'loaderwrap' ).classList.add( 'hide' )
}

export const show = f => {
	doc.id( 'loaderwrap' ).classList.remove( 'hide' )
}