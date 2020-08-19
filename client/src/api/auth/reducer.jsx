export default (state, action) => {
	switch(action.type) {
		case 'USER_AUTHENTICATE':
			return {
				loading: false,
				data: action.payload
			}
		case 'AUTH_ERROR':
			return {
				loading: false,
				error: action.payload
			}
		case 'USER_REGISTER':
			return {
				loading: false,
				data: action.payload
			}
		case 'USER_LOGIN':
			return {
				loading: false,
				data: action.payload
			}
		case 'USER_LOGOUT':
			return {
				loading: false,
				data: action.payload
			}
		case 'ERROR':
			return {
				error: action.payload
			}
			
		// case 'GET_PAGE':
		// 	return {
		// 		...state,
		// 		loading: false,
		// 		page: action.payload
		// 	}
		// case 'PAGE_ERROR':
		// 	return {
		// 		...state,
		// 		error: action.payload
		// 	}
		default:
			return state;
	}
}