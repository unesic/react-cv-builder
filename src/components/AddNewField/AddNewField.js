import React from 'react';
import styles from './AddNewField.module.css'

import BuilderContext from '../../containers/Builder/context/builder-context';

import { FiPlus, FiMinus} from 'react-icons/fi';
import Button from '../../ui/Button/Button';
import FieldTypes from '../../containers/FieldTypes/FieldTypes';

const AddNewField = _ => {
	return (
		<BuilderContext.Consumer>
			{context => (
				<div className={styles.AddNewField}>
				<FieldTypes
					show={context.showFieldTypes}
					newFieldHandler={context.addNewFieldHandler} />
				<Button
					Active={context.showFieldTypes}
					type='Add'
					clicked={_ => context.setShowFieldTypes(!context.showFieldTypes)}>
					{context.showFieldTypes ? <FiMinus /> : <FiPlus />}
				</Button>
			</div>
			)}
		</BuilderContext.Consumer>
	);
}
 
export default AddNewField;