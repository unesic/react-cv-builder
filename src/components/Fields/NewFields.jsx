import React from 'react';
import styles from './Fields.module.css';

import NewSingleField from './SingleField/NewSingleField';

const NewFields = fields => {
	return (
		<div className={styles.Fields}>
			{fields.length > 0 ? fields.map(field => (
				<NewSingleField
					key={field.id}
					{...field}
				>
					{console.log(field)}
				</NewSingleField>
			)) : null }
		</div>
	);
}
 
export default NewFields;