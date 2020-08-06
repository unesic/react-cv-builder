import React from 'react';
import styles from './List.module.css';

import { TextArea } from '../../../../ui/InputFields/InputFields';

const List = ({ fieldData, onKeyDownHandler, onKeyUpHandler, onChangeHandler, editing }) => {

    const parsedData = _ => {
        if (fieldData) {
            const items = fieldData.split('\n');
            const data = items.map((item, i) => <li key={i}>{item}</li>);
            
            return data;
        }
    }

	return (
        <div className={styles.List}>
			{editing ? (
				<TextArea autoFocus
					value={fieldData}
					onChange={onChangeHandler}
					onKeyDown={onKeyDownHandler}
					onKeyUp={onKeyUpHandler} />
				) : <ul>{parsedData()}</ul>}
		</div>
	);
}
 
export default List;