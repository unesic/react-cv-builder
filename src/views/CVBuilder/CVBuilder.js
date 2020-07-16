import React from 'react';
import styles from './CVBuilder.module.css';

import SideDrawer from '../../containers/SideDrawer/SideDrawer';
import Builder from '../../containers/Builder/Builder';

const CVBuilder = _ => {
    return (
        <div className={styles.CVBuilder}>
            <SideDrawer />
            <Builder />
        </div>
    );
}
 
export default CVBuilder;