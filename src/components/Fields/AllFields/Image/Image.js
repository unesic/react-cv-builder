import React from 'react';
import styles from './Image.module.css';

import { Text } from '../../../../ui/InputFields/InputFields';

const Image = ({ fieldData, onKeyPressHandler, onChangeHandler, editing }) => {
	return (
		<div className={styles.Image}>
			{editing ? (
				<React.Fragment>
					<Text
						value={fieldData ? fieldData : ''}
						onKeyDown={onKeyPressHandler}
						onChange={onChangeHandler}
						autoFocus />
					<img src={fieldData} alt='' className={styles.Thumbnail} />
				</React.Fragment>
				) : <img src={fieldData} alt='' />}
		</div>
	);
}
 
export default Image;