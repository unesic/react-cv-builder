import React, { useState, useEffect } from 'react';
import styles from './Builder.module.css';

import BuilderContext from './context/builder-context';
import { DragDropContext} from 'react-beautiful-dnd';

import AddNew from '../../components/AddNew/AddNew';
import Section from '../../components/Section/Section';

import Paper from '../Paper/Paper';
import UpdatedFields from '../../components/Fields/UpdatedFields/UpdatedFields';
import Modal from '../../ui/Modal/Modal';
import ModalContent from '../../components/ModalContent/ModalContent';

const Builder = _ => {
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

	// Handles adding new sections
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

	// Handles all the updates on section as well its children elements
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

	// Sets a field that's being edited currently and opens a modal
	const beautifyFieldHandler = id => {
		setModifying(id);
		setModalOpen(true);
	}

	// On field input, update the modal properties state
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
				modalFields: modalFields,
				beautifyFieldHandler: beautifyFieldHandler,
                saveProperties: saveProperties,
                setSectionData: setSectionData,
			}}
		>
			<div className={styles.Builder}>
				<DragDropContext onDragEnd={onDragEnd}>
					<Paper>
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