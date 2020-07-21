import React from 'react';
import styles from './Text.module.css';

import { TextArea } from '../../../../ui/InputFields/InputFields';

const Text = ({ fieldData, onKeyDownHandler, onKeyUpHandler, onChangeHandler, editing }) => {

    const parsedData = _ => {
        if (fieldData) {
            const items = fieldData.split('\n');
            const data = items.map((item, i) => (
				<React.Fragment key={i}>{item}<br /></React.Fragment>
			));
            
            return data;
        }
    }
	return (
		<div className={styles.Text}>
			{editing ? (
				<TextArea autoFocus
					value={fieldData}
					onChange={onChangeHandler}
					onKeyDown={onKeyDownHandler}
					onKeyUp={onKeyUpHandler} />
				) : <p>{parsedData()}</p>}
		</div>
	);
}
 
export default Text;