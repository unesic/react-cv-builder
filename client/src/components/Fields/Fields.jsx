import React from 'react';
import styles from './Fields.module.css';

import { BuilderContext } from '../../containers/Builder';
import SingleField from './SingleField/SingleField';

const Fields = _ => {
	return (
		<div className={styles.Fields}>
			<BuilderContext.Consumer>
				{context => context.fields ? context.fields.map((field, i) => (
					<SingleField
						key={field.id}
						index={i}
						properties={{...field}} />
				)) : null }
			</BuilderContext.Consumer>
		</div>
	);
}
 
export default Fields;