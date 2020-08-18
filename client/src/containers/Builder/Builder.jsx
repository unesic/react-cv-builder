import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Spinner } from 'react-bootstrap';

import styles from './Builder.module.css';
import BuilderContext from './context/builder-context';

import AddNew from '../../components/AddNew/AddNew';
import Section from '../../components/Section/Section';
import * as SectionUtils from '../../components/Section/helper-functions';

import Paper from '../Paper/Paper';
import UpdatedFields from '../../components/Fields/UpdatedFields/UpdatedFields';
import Modal from '../../ui/Modal/Modal';
import ModalContent from '../../components/ModalContent/ModalContent';

const Builder = ({ page, error, loading }) => {
	const [dragging, setDragging] = useState();
	const [modifying, setModifying] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [modalFields, setModalFields] = useState([]);
	const [modalProperties, setModalProperties] = useState({});
	const [activeField, setActiveField] = useState();
	const [sections, setSections] = useState([]);
	const [parsedSections, setParsedSections] = useState([]);

	const spinner = <div style={{textAlign: 'center'}}><Spinner animation="border" /></div>

	useEffect(() => {
		if (page) {
			const data = page[0].data.replace(/'/g, '"');
			const parsed = JSON.parse(data);
			setSections(parsed);
		}
	}, [page]);

	useEffect(() => {
		const newParsedSections = [];
		sections.forEach((section, i) => {
			newParsedSections.push(<Section key={section.id} {...section} index={i} />)
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
			}
		];
		
		setSections(newSections);
	}

	// Handles all the updates on section as well its children elements
	const setSectionData = (id, newData) => {
		const newSections = [...sections];
		const current = newSections.find(section => section.id === id);
		const old = newSections.find(section => section.id === id);
		const index = newSections.indexOf(current);
		current.columns = [...newData];
		newSections[index] = {...current};

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

	const duplicateSectionHandler = sectionId => {
		const newSections = [...sections];
		const {section, index} = SectionUtils.duplicateSection(sections, sectionId);
		newSections.splice(index, 0, section)
		
		setSections([...newSections]);
	}

	const deleteSectionHandler = sectionId => {
		const newSections = [...sections].filter(section => section.id !== sectionId);
		setSections(newSections);
	}

	const onDragStart = result => {
		setDragging(result.type);
	}

	const onDragEnd = result => {
		if (!result.destination) {
			return;
		}

		let newSections;
		const type = result.type;
		const src = result.source;
		const dest = result.destination;
		const id = result.draggableId;

		if (type === 'paper') {
			newSections = SectionUtils.reorderSections([...sections], src, dest, id);
		} else if (type === 'section') {
			newSections = SectionUtils.reorderColumns([...sections], src, dest, id);
		} else if (type === 'column') {
			newSections = SectionUtils.reorderFields([...sections], src, dest, id);
		}
		
		setSections(newSections);
	}

	return (
		<BuilderContext.Provider
			value={{
				sections: sections,
				modalFields: modalFields,
				dragging: dragging,
				beautifyFieldHandler: beautifyFieldHandler,
				saveProperties: saveProperties,
				setSectionData: setSectionData,
				deleteSectionHandler: deleteSectionHandler,
				duplicateSectionHandler: duplicateSectionHandler,
			}}
		>
			<div className={styles.Builder}>
				<DragDropContext
					onDragStart={onDragStart}
					onDragEnd={onDragEnd}
				>
					<Paper dragging={dragging}>
						{loading ? spinner : parsedSections ? parsedSections : null}
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