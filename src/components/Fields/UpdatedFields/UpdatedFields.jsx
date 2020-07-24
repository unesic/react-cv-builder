import React, { useState } from 'react';
import styles from './UpdatedFields.module.css';

import Tabs from './Tabs/Tabs';

const UpdatedFields = ({ fields, properties, propertyChangeHandler }) => {
	const [activeTab, setActiveTab] = useState(0);

	const changeActiveTabHandler = id => {
		setActiveTab(id);
	}

	return (
		<div className={styles.UpdatedFields}>
			<Tabs
				fields={fields}
				properties={properties}
				propertyChangeHandler={propertyChangeHandler}
				activeTab={activeTab}
				switchTabHandler={changeActiveTabHandler} />
		</div>
	)
}

export default UpdatedFields;