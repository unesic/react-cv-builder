import React, { useState, useContext } from 'react';
import styles from './UpdatedFields.module.css';

import { BuilderContext } from '../../../containers/Builder/Builder';
import { propertyChangeHandler } from '../../../containers/Builder/builder.utils';
import Tabs from './Tabs/Tabs';

const UpdatedFields = ({ fields, properties }) => {
	const [activeTab, setActiveTab] = useState(0);
	const context = useContext(BuilderContext);

	const changeActiveTabHandler = id => {
		setActiveTab(id);
	}

	return (
		<div className={styles.UpdatedFields}>
			<Tabs
				fields={fields}
				properties={properties}
				propertyChangeHandler={e => {
					propertyChangeHandler(e, context.builderState, context.dispatch)
				}}
				activeTab={activeTab}
				switchTabHandler={changeActiveTabHandler} />
		</div>
	)
}

export default UpdatedFields;