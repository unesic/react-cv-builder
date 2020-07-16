import React from 'react';
import styles from './FieldButtons.module.css';

import { FiEdit, FiDroplet, FiTrash, FiSave, FiX  } from 'react-icons/fi';

import Button from '../../../ui/Button/Button';

const FieldButtons = ({ fieldId, onEdit, onSave, onCancel, onDelete, onBeautify, editing }) => {
	const buttons = (
		<React.Fragment>
			<Button
				type='Edit'
				clicked={onEdit}>
					<FiEdit />
				</Button>
			<Button
				parentFieldId={fieldId}
				type='Delete'
				clicked={_ => onDelete(fieldId)}>
					<FiTrash/>
				</Button>
		</React.Fragment>
	);

	const editingButtons = (
		<React.Fragment>
			<Button
				type='Save'
				clicked={onSave}>
					<FiSave />
				</Button>
			<Button
				type='Cancel'
				clicked={onCancel}>
					<FiX />
				</Button>
		</React.Fragment>
	);

	return (
		<div className={`${styles.FieldButtons}`}>
			<React.Fragment>
				<Button
					type='Beautify'
					clicked={_ => onBeautify(fieldId)}>
						<FiDroplet />
					</Button>
				{editing ? editingButtons : buttons}
			</React.Fragment>
		</div>
	);
}
 
export default FieldButtons;