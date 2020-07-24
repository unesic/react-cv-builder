import React, { useContext } from 'react';
import { FiPlus, FiMinus} from 'react-icons/fi';

import styles from './AddNewField.module.css'
import ColumnContext from '../../components/Column/column-context';
import Button from '../../ui/Button/Button';
import FieldTypes from '../../containers/FieldTypes/FieldTypes';

const AddNewField = _ => {
	const context = useContext(ColumnContext);

	return (
		<div className={styles.AddNewField}>
			<FieldTypes
				show={context.showFieldTypes}
				newFieldHandler={context.newFieldHandler}
			/>
			<Button
				Active={context.showFieldTypes}
				type='Add'
				clicked={_ => context.setShowFieldTypes(!context.showFieldTypes)}
			>
				{context.showFieldTypes ? <FiMinus /> : <FiPlus />}
			</Button>
		</div>
	);
}
 
export default AddNewField;