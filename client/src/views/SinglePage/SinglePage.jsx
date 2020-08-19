import React, { useState, useEffect, useContext } from 'react';
import { Spinner } from 'react-bootstrap';

import { AppContext } from '../../App';
import CVBuilder from '../../views/CVBuilder/CVBuilder';

const SinglePage = (props) => {
	const state = {
		username: props.match.params.username,
		slug: props.match.params.slug,
	};
	const [loading, setLoading] = useState(true);
	const [pageData, setPageData] = useState();
	const context = useContext(AppContext);

	useEffect(() => {
		if (pageData) {
			setLoading(false);
		}
	}, [pageData]);

	useEffect(() => {
		getPageData();
		context.setRequestedPage(true);

		return _ => {
			context.setRequestedPage(false);
		}
	}, []);

	async function getPageData() {
		const res = await context.Page.getPageData(context.jwt, state.username, state.slug);
		setPageData(res);
		console.log(res);
	}

	return (
		loading ? <Spinner animation="border" /> :
			pageData.payload.isOwner ? <CVBuilder page={pageData.payload.page} /> : 'preview'
	);
}
 
export default SinglePage;