import React, { useState } from 'react';

import styles from './CVBuilder.module.css';
import SideDrawer from '../../containers/SideDrawer/SideDrawer';
import Builder from '../../containers/Builder/Builder';

const CVBuilder = ({ page }) => {
	const [state, setState] = useState({
		page: {...page},
		error: null,
		loading: false
	});

    return (
        <div className={styles.CVBuilder}>
            <SideDrawer />
            <Builder {...state} />
        </div>
    );
}
 
export default CVBuilder;