import React from 'react';
import styles from './Paper.module.css';

const Paper = ({ children }) => {
    return (
        <div className={styles.Paper}>
            {children}
        </div>
    );
}
 
export default Paper;