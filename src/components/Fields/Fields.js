import React from 'react';
import styles from './Fields.module.css';

import BuilderContext from '../../containers/Builder/context/builder-context';
import SingleField from './SingleField/SingleField';

const Fields = _ => {
	return (
		<BuilderContext.Consumer>
			{context => context.fields ? context.fields.map((field, i) => (
				<SingleField
					key={field.id}
					index={i}
					properties={{...field}} />
			)) : null }
		</BuilderContext.Consumer>
	);
}
 
export default Fields;