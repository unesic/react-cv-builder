import React from 'react';
import styles from './FieldButtons.module.css';

import { FiEdit, FiDroplet, FiTrash, FiSave, FiX, FiCopy } from 'react-icons/fi';

import Button from '../../../ui/Button/Button';

const FieldButtons = ({ id, onEdit, onSave, onCancel, onDuplicate, onDelete, onBeautify, editing }) => {
	const buttons = (
		<React.Fragment>
			<Button
				type='Edit'
				clicked={onEdit}>
					<FiEdit />
				</Button>
			<Button
				parentFieldId={id}
				type='Delete'
				clicked={_ => onDelete(id)}>
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
		<div className={[
			styles.FieldButtons,
			editing ? styles.Editing : ''
		].join(' ')}>
			<React.Fragment>
				<Button
					type='Beautify'
					customStyles={editing ? styles.Editing : ''}
					clicked={_ => onBeautify(id)}>
						<FiDroplet />
					</Button>
				<Button
					type='Add'
					clicked={_ => onDuplicate(id)}>
						<FiCopy />
					</Button>
				{editing ? editingButtons : buttons}
			</React.Fragment>
		</div>
	);
}
 
export default FieldButtons;