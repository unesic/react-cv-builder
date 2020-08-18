import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import styles from './CVBuilder.module.css';

import reducer from '../../api/auth/reducer';
import SideDrawer from '../../containers/SideDrawer/SideDrawer';
import Builder from '../../containers/Builder/Builder';

const CVBuilder = _ => {
	const [state, dispatch] = useReducer(reducer, {
		page: null,
		error: null,
		loading: false
	});

	useEffect(_ => {
		// getPage();
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
				type: 'PAGE_ERROR',
				payload: err.response.data.error
			})
		}
	}

    return (
        <div className={styles.CVBuilder}>
            <SideDrawer />
            <Builder {...state} />
        </div>
    );
}
 
export default CVBuilder;