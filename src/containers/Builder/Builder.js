import React, { useState, useEffect } from 'react';
import styles from './Builder.module.css';
import BuilderContext from './context/builder-context';

import Paper from '../Paper/Paper';
import Fields from '../../components/Fields/Fields';
import * as fieldStyles from '../../components/Fields/styles/fieldStyles';
import UpdatedFields from '../../components/Fields/UpdatedFields/UpdatedFields';
import AddNewField from '../../components/AddNewField/AddNewField';
import Modal from '../../ui/Modal/Modal';
import ModalContent from '../../components/ModalContent/ModalContent';

const Builder = _ => {
	const [showFieldTypes, setShowFieldTypes] = useState(false);
	const [newFieldId, setNewFieldId] = useState(0);
	const [fields, setFields] = useState([]);
	const [modifying, setModifying] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [modalFields, setModalFields] = useState([]);
	const [modalProperties, setModalProperties] = useState({});

	// Upon clicking the 'modify' button, prepare properties for modal 
	useEffect(_ => {
		if (modifying !== null) {
			const activeField = fields.find(field => field.id === modifying);
			setModalProperties(activeField ? {...activeField.styles} : null);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modifying]);

	// Updates modal fields when modal properties change 
	useEffect(_ => {
		const activeField = fields.find(field => field.id === modifying);

		const updatedFields = (
			<UpdatedFields
				fields={activeField ? {...activeField.styles} : null}
				properties={{...modalProperties}}
				propertyChangeHandler={propertyChangeHandler} />
		);

		setModalFields(updatedFields);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modalProperties]);

	// Adds a new field on button click and closes the fields pop-up
	const addNewFieldHandler = type => {
		const newFields = [
			...fields,
			{
				id: newFieldId,
				type: type,
				styles: {
					...fieldStyles[type],
				}
			}
		];

		setFields(newFields);
		setNewFieldId(newFieldId+1);
		setShowFieldTypes(false);
	}

	// Sets a currently field that's being edited and opens a modal
	const beautifyFieldHandler = id => {
		setModifying(id);
		setModalOpen(true);
	}

	// On field input, update the properties state
	const propertyChangeHandler = e => {
		const stringify = JSON.stringify({...modalProperties})
		const regex = new RegExp(/,"value":"(.*?)"}/, '');
		
		const first = stringify.slice(0, stringify.indexOf(`"${e.target.name}":`));
		const second = stringify.slice(stringify.indexOf(`"${e.target.name}":`));
		const second_new = second.replace(regex, `,"value":"${e.target.value}"}`);
		
		const parsed = JSON.parse(first + second_new);
		
		setModalProperties(parsed);
	}

	// Saves the properties from input fields on modal and closes the modal
	const saveProperties = _ => {
		const oldFields = [...fields];
		const activeField = oldFields.find(field => field.id === modifying);

		const newFields = oldFields.map(field => {
			if (field === activeField) {
				field.styles = {...modalProperties}
			}

			return field;
		})

		setFields(newFields);
		setModalOpen(false);
		setModifying(null);
	}

	// Deletes the field
	const deleteFieldHandler = id => {
		const newFields = fields.filter(field => {
			return field.id !== id;
		});

		setFields(newFields);
	}

	return (
		<BuilderContext.Provider
			value={{
				fields: fields,
				modalFields: modalFields,
				showFieldTypes: showFieldTypes,
				modifying: modifying,
				setModalOpen: setModalOpen,
				setShowFieldTypes: setShowFieldTypes,
				beautifyFieldHandler: beautifyFieldHandler,
				deleteFieldHandler: deleteFieldHandler,
				addNewFieldHandler: addNewFieldHandler,
				saveProperties: saveProperties,
			}}>
			<div className={styles.Builder}>
				<Paper>
					<div className={styles.FieldsWrapper}>
						<Fields />
					</div>
					<AddNewField />
				</Paper>

				<Modal
					isVisible={modalOpen}
					backdropClicked={_ => setModalOpen(false)}>
					<ModalContent />
				</Modal>
			</div>	
		</BuilderContext.Provider>
	);
}
 
export default Builder;