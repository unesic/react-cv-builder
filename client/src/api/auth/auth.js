import axios from 'axios';

class Auth {
	async register(user) {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}

		try {
			const res = await axios.post('/api/v1/users', user, config);
	
			return {
				type: 'USER_REGISTER',
				payload: {
					user: res.data.data,
					token: res.data.token
				}
			}
		} catch (err) {
			return {
				type: 'ERROR',
				payload: err.response.data.error
			}
		}
	}

	async login(user) {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}

		try {
			const res = await axios.post('/api/v1/auth', user, config);
	
			return {
				type: 'USER_LOGIN',
				payload: {
					user: res.data.data,
					token: res.data.token
				}
			}
		} catch (err) {
			return {
				type: 'ERROR',
				payload: err.response.data.error
			}
		}
	}

	async authenticate(jwt) {
		const config = {
			headers: {
				'X-Auth-Token': jwt ? jwt : ''
			}
		}

		try {
			const res = await axios.get('/api/v1/auth/user', config);

			return {
				type: 'USER_AUTHENTICATE',
				payload: {
					user: res.data.data,
					token: jwt
				}
			}
		} catch (err) {
			return {
				type: 'AUTH_ERROR',
				payload: err.response.data.error
			}
		}
	}

	logout() {
		localStorage.removeItem('jwt_token');
	}
}
 
export default new Auth();