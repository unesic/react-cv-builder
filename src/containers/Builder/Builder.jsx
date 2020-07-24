import React, { useState, useEffect } from 'react';
import styles from './Builder.module.css';

import BuilderContext from './context/builder-context';
import { DragDropContext} from 'react-beautiful-dnd';

import AddNew from '../../components/AddNew/AddNew';
import Section from '../../components/Section/Section';

import Paper from '../Paper/Paper';
// import Fields from '../../components/Fields/Fields';
import * as fieldStyles from '../../components/Fields/styles/fieldStyles';
import UpdatedFields from '../../components/Fields/UpdatedFields/UpdatedFields';
// import AddNewField from '../../components/AddNewField/AddNewField';
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
    

	const [activeField, setActiveField] = useState();
	const [sections, setSections] = useState([]);
	const [parsedSections, setParsedSections] = useState([]);

	useEffect(() => {
		const newParsedSections = [];
		sections.forEach(section => {
			newParsedSections.push(<Section key={section.id} {...section} />)
		})

		setParsedSections(newParsedSections);
	}, [sections]);

	useEffect(() => {
		!modalOpen && setModifying(null)
	}, [modalOpen]);

    const newContainerHandler = _ => {
        const newSections = [
            ...sections,
            {
                id: 'section-id-' + new Date().valueOf(),
                columns: [],
                setSectionData: setSectionData
            }
        ];
        
        setSections(newSections);
    }

    const setSectionData = (id, newData) => {
		const newSections = sections.map(section => ({...section}));
		const current = newSections.find(section => section.id === id);
		const old = sections.find(section => section.id === id);
		const index = newSections.indexOf(current);
		current.columns = [...newData];
		newSections[index] = current;

		if (old.columns !== current.columns) {
			setSections(newSections);
		}
    }












	// Upon clicking the 'modify' button, prepare properties for modal 
	useEffect(_ => {
		if (modifying !== null) {
			const fields = [];
			sections.forEach(section => {
				[...section.columns].forEach(column => {
					[...column.fields].forEach(field => { fields.push(field) })
				})
			})
			const activeField = fields.find(field => field.id === modifying);
			setModalProperties(activeField ? activeField.customStyles : null);
			setActiveField(activeField);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modifying]);

	// Updates modal fields when modal properties change 
	useEffect(_ => {
		const updatedFields = (
			<UpdatedFields
				fields={activeField ? {...activeField.customStyles} : null}
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
		const updatedActiveField = {...activeField};
		updatedActiveField.customStyles = {...modalProperties};

		const newSections = [...sections];
		newSections.forEach(section => {
			section.columns.forEach(column => {
				column.fields.forEach(field => {
					if (field.id === updatedActiveField.id) {
						field.customStyles = {...updatedActiveField.customStyles}
					}
				})
			})
		})

		setSections(newSections);
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

	const onDragEnd = result => {
		if (!result.destination) {
			return;
		}

		const newFields = [...fields];
		const [removed] = newFields.splice(result.source.index, 1);
		newFields.splice(result.destination.index, 0, removed);
		setFields(newFields);
	}

	return (
		<BuilderContext.Provider
			value={{
				// fields: fields,
				modalFields: modalFields,
				// showFieldTypes: showFieldTypes,
				// modifying: modifying,
				// setModalOpen: setModalOpen,
				// setShowFieldTypes: setShowFieldTypes,
				beautifyFieldHandler: beautifyFieldHandler,
				// deleteFieldHandler: deleteFieldHandler,
				// addNewFieldHandler: addNewFieldHandler,
                saveProperties: saveProperties,
				
                setSectionData: setSectionData,
			}}
		>
			<div className={styles.Builder}>
				<DragDropContext onDragEnd={onDragEnd}>
					<Paper>
						{/* <Fields /> */}
						{/* <AddNewField /> */}

                        {parsedSections ? parsedSections : null}
                        <AddNew clicked={newContainerHandler} />
					</Paper>
				</DragDropContext>

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