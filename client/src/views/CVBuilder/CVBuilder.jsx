import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import styles from './CVBuilder.module.css';

import SideDrawer from '../../containers/SideDrawer/SideDrawer';
import Builder from '../../containers/Builder/Builder';

function reducer(state, action) {
	switch(action.type) {
		case 'GET_PAGE':
			return {
				...state,
				loading: false,
				page: action.payload
			}
		case 'ERROR':
			return {
				...state,
				error: action.payload
			}
		default:
			return state;
	}
}


const CVBuilder = _ => {
	const [state, dispatch] = useReducer(reducer, {
		page: null,
		error: null,
		loading: true
	});

	useEffect(_ => {
		getPage();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getPage = async _ => {
		try {
			const res = await axios.get('/api/v1/pages');
	
			dispatch({
				type: 'GET_PAGE',
				payload: res.data.data
			})
		} catch (err) {
			dispatch({
				type: 'ERROR',
				payload: err.response.data.error
			})
		}
	}

    return (
        <div className={styles.CVBuilder}>
            <SideDrawer />
            <Builder page={state.page} />
        </div>
    );
}
 
export default CVBuilder;