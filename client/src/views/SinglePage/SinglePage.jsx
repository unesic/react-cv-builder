import React, { useState, useEffect, useContext } from "react";
import { Spinner } from "react-bootstrap";

import { AppContext } from "../../App";
import PageBuilder from "./PageBuilder/PageBuilder";
import PageViewer from "./PageViewer/PageViewer";

const SinglePage = (props) => {
	const state = {
		username: props.match.params.username,
		slug: props.match.params.slug,
	};
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState();
	const context = useContext(AppContext);

	useEffect(() => {
		getPageData();

		return () => {
			context.setPageMode("");
			setLoading(true);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (context.pageData) {
			setLoading(false);

			const isEditing = props.location.search.includes("&edit=1");

			isEditing
				? context.setPageMode("edit")
				: context.setPageMode("preview");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [context.pageData]);

	useEffect(() => {
		if (context.pageMode === "edit")
			setPage(<PageBuilder page={context.pageData.payload.page} />);
		else if (context.pageMode === "preview")
			setPage(<PageViewer page={context.pageData.payload.page} />);
	}, [context.pageMode]);

	async function getPageData() {
		const res = await context.Page.getPageData(
			context.jwt,
			state.username,
			state.slug
		);
		context.setPageData(res);
	}

	return loading ? <Spinner animation="border" /> : page ? page : null;
};

export default SinglePage;
