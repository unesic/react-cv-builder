import React from "react";

import styles from "./PageBuilder.module.css";
import SideDrawer from "../../../containers/SideDrawer/SideDrawer";
import Builder from "../../../containers/Builder/Builder";

const PageBuilder = ({ page }) => {
	const state = {
		page: { ...page },
		error: null,
		loading: false,
	};

	return (
		<div className={styles.PageBuilder}>
			<SideDrawer />
			<Builder {...state} />
		</div>
	);
};

export default PageBuilder;
