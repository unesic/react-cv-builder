import React from 'react';
import BuilderContext from '../../containers/Builder/context/builder-context';

import SingleField from './SingleField/SingleField';

const Fields = _ => {
	return (
		<BuilderContext.Consumer>
			{context => context.fields ? context.fields.map(field => (
					<SingleField
						key={field.id}
						properties={{...field}} />
				)) : null }
		</BuilderContext.Consumer>
	);
}
 
export default Fields;