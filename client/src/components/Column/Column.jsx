import React, { useState, useEffect, useRef, useContext } from 'react';
import { Col } from 'react-bootstrap';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { FiTrash, FiCopy } from 'react-icons/fi';

import styles from './Column.module.css';

import { BuilderContext } from '../../containers/Builder/Builder';
import { SectionContext } from '../Section/Section';
import ColumnContext from './column-context';
import { duplicateField } from '../Section/section.utils';
import * as fieldStyles from '../../components/Fields/styles/fieldStyles';

import SingleField from '../../components/Fields/SingleField/SingleField';
import AddNewField from '../../components/AddNewField/AddNewField';
import Button from '../../ui/Button/Button';

const Column = ({ id, fields, index }) => {
	const [showFieldTypes, setShowFieldTypes] = useState(false);
	const [data, setData] = useState();
	const [parsedFields, setParsedFields] = useState();
	const isMounted = useRef(false);
	const builderContext = useContext(BuilderContext);
	const context = useContext(SectionContext);
	
	useEffect(_ => {
		const initialData = [];
		if (fields.length) {
			fields.forEach(field => {
				initialData.push({...field});
			})
		}

		setData(initialData);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(fields)]);

	useEffect(_ => {
		if(isMounted.current) {
			const parsed = data.length > 0 ? data.map((field, index) => (
				<SingleField
					key={field.id}
					{...field}
					index={index}
				/>
			)) : null;

			setParsedFields(parsed);
		} else {
			isMounted.current = true;
		}
	}, [data]);

	const newFieldHandler = (type) => {
		const newData = data.length > 0 ? [...data] : [];

		const defaultFieldData = {
			text: 'Simple text field',
			list: 'List item',
			image: 'https://picsum.photos/500/100'
		}
		const newField = {
			id: 'field-id-' + new Date().valueOf(),
			data: defaultFieldData[type],
			type: type,
			customStyles: {...fieldStyles[type]},
		}

		newData.push(newField)
		setData(newData);
		context.updateColumnData(id, newData);
		setShowFieldTypes(false);
	}

	const duplicateFieldHandler = fieldId => {
		const newData = duplicateField(builderContext.builderState.sections, fieldId);
		setData(newData);
		context.updateColumnData(id, newData);
	}

	const deleteFieldHandler = fieldId => {
		const newData = [...data].filter(field => field.id !== fieldId);
		setData(newData);
		context.updateColumnData(id, newData);
	}

	const setFieldData = (fieldId, updatedData) => {
		const newData = [...data];
		const current = newData.find(field => field.id === fieldId);
		const index = newData.indexOf(current);
		current.data = updatedData;
		newData[index] = current;

		setData(newData);
		context.updateColumnData(id, newData);
	}

	return (
		<ColumnContext.Provider
			value={{
				showFieldTypes: showFieldTypes,
				setShowFieldTypes: setShowFieldTypes,
				newFieldHandler: newFieldHandler,
				setFieldData: setFieldData,
				duplicateFieldHandler: duplicateFieldHandler,
				deleteFieldHandler: deleteFieldHandler,
			}}
		>
			<Draggable draggableId={id} index={index}>
				{(provided, snapshot) => (
					<Col
						className='my-2'
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						ref={provided.innerRef}
					>
						<div className={styles.Column}>
							<Droppable
								droppableId={id}
								index={index}
								isDropDisabled={builderContext.builderState.dragging !== 'column'}
								type="column"
							>
								{(provided, snapshot) => (
									<div
										ref={provided.innerRef}
										{...provided.droppableProps}
									>
										{parsedFields ? parsedFields : null}
										{provided.placeholder}
									</div>
								)}
							</Droppable>

							<div className={`${styles.Buttons} d-flex justify-content-center py-2`}>
								<AddNewField />
								<Button clicked={_ => context.deleteColumnHandler(id)}>
									<FiTrash/>
								</Button>
								<Button clicked={_ => context.duplicateColumnHandler(id)}>
									<FiCopy/>
								</Button>
							</div>
						</div>
					</Col>
				)}
			</Draggable>
		</ColumnContext.Provider>
	);
}
 
export default Column;