import axios from 'axios';

class Page {
	async create(userId, title) {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json'
				}
			}

			const slug = title.toLowerCase().split(' ').join('-');

			const data = {
				ownerId: userId,
				title: title,
				slug: slug,
				data: ''
			}
	
			const page = await axios.post('/api/v1/pages/create', data, config);
	
			return {
				type: 'NEW_PAGE',
				payload: page.data.data
			}
		} catch (err) {
			return {
				type: 'ERROR',
				payload: err.response.data.error
			}
		}
	}

	async getPagesFromUserId(jwt) {
		try {
			const config = {
				headers: {
					'X-Auth-Token': jwt ? jwt : ''
				}
			}
	
			const pages = await axios.get('/api/v1/pages', config);
	
			return {
				type: 'GET_ALL_PAGES',
				payload: pages.data.data
			}
		} catch (err) {
			return {
				type: 'ERROR',
				payload: err.response.data.error
			}
		}
	}

	async delete(id) {
		try {
			const res = await axios.delete(`/api/v1/pages/${id}`);

			return {
				type: 'DELETE_PAGE',
				payload: res.data
			}
		} catch (err) {
			return {
				type: 'ERROR',
				payload: err.response.data.error
			}
		}
	}
}

export default new Page();