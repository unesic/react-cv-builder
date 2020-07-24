import React, { useState, useEffect, useRef, useContext } from 'react';
import { Col } from 'react-bootstrap';

import SectionContext from '../Section/section-context';
import ColumnContext from './column-context';
import * as fieldStyles from '../../components/Fields/styles/fieldStyles';

import NewSingleField from '../../components/Fields/SingleField/NewSingleField';
import NewAddNewField from '../../components/AddNewField/NewAddNewField';

const Column = ({ id, fields }) => {
	const [showFieldTypes, setShowFieldTypes] = useState(false);
	const [data, setData] = useState();
	const [parsedFields, setParsedFields] = useState();
	const isMounted = useRef(false);
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
			const parsed = data.length > 0 ? data.map(field => (
				<NewSingleField
					key={field.id}
					{...field}
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

	const deleteFieldHandler = fieldId => {
		const newData = [...data].filter(field => field.id !== fieldId);
		setData(newData);
		context.updateColumnData(id, newData);
	}

	const setFieldData = (id, updatedData) => {
		const newData = [...data];
		const current = newData.find(field => field.id === id);
		const index = newData.indexOf(current);
		current.data = updatedData;
		newData[index] = current;

		setData([...newData]);
	}

	return (
		<ColumnContext.Provider
			value={{
				showFieldTypes: showFieldTypes,
				setShowFieldTypes: setShowFieldTypes,
				newFieldHandler: newFieldHandler,
				setFieldData: setFieldData,
				deleteFieldHandler: deleteFieldHandler,
			}}
		>
			<Col style={{backgroundColor: '#ccc8'}}>
				{parsedFields ? parsedFields : null}
				<NewAddNewField />
			</Col>
		</ColumnContext.Provider>
	);
}
 
export default Column;