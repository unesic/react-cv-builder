import React, { useState, useEffect, useContext } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styles from './SingleField.module.css';

import { BuilderContext } from '../../../containers/Builder/Builder';
import { beautifyFieldHandler } from '../../../containers/Builder/builder.utils';
import columnContext from '../../Column/column-context';
import advancedStyleParser from '../../../advancedStyleParser/advancedStyleParser';

import FieldButtons from '../FieldButtons/FieldButtons';
import Text from '../AllFields/Text/Text';
import Image from '../AllFields/Image/Image';
import List from '../AllFields/List/List';

const SingleField = ({ id, data, type, customStyles, index }) => {
	const [editing, setEditing] = useState(false);
	const [snapshotData, setSnapshotData] = useState(null);
	const builderContext = useContext(BuilderContext);
	const ColumnContext = useContext(columnContext);

	useEffect(_ => {
		setSnapshotData(data);
	}, [data, setSnapshotData]);

	const editHandler = _ => {
		setEditing(true);
		setSnapshotData(data);
	}

	const saveHandler = _ => {
		setEditing(false);
		setSnapshotData(null);
		ColumnContext.setFieldData(id, data);
	}

	const cancelHandler = _ => {
		setEditing(false);
		ColumnContext.setFieldData(id, snapshotData);
	}

	const onDataChangeHandler = e => {
		ColumnContext.setFieldData(id, e.target.value);
	}
	
	let keysPressed = {};
	const onKeyUpHandler = e => {
		delete keysPressed[e.key];
	}

	const onKeyDownHandler = e => {
		keysPressed[e.key] = true;

		if (e.key === 'Enter' && !keysPressed['Shift']) {
			saveHandler();
		} else if (e.key === 'Escape') {
			cancelHandler();
		}
	}

	const allFields = {
		text: <Text
				fieldData={data}
				onKeyDownHandler={onKeyDownHandler}
				onKeyUpHandler={onKeyUpHandler}
				onChangeHandler={onDataChangeHandler}
				editing={editing} />,

		list: <List
				fieldData={data}
				onKeyDownHandler={onKeyDownHandler}
				onKeyUpHandler={onKeyUpHandler}
				onChangeHandler={onDataChangeHandler}
				editing={editing} />,

		image: <Image
				fieldData={data}
				onKeyDownHandler={onKeyDownHandler}
				onKeyUpHandler={onKeyUpHandler}
				onChangeHandler={onDataChangeHandler}
				editing={editing} />
	};

	return (
		<Draggable draggableId={id} index={index} type="field">
			{(provided, snapshot) => (
				<div
					className={[
						styles.SingleField,
						editing && styles.Editing,
					].join(' ')}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
				>
					<div
						className={styles.Inner}
						style={advancedStyleParser(customStyles)}
					>
						{allFields[type]}
						<FieldButtons
							id={id}
							onEdit={editHandler}
							onSave={saveHandler}
							onCancel={cancelHandler}
							onDuplicate={ColumnContext.duplicateFieldHandler}
							onDelete={ColumnContext.deleteFieldHandler}
							onBeautify={_ => {
								beautifyFieldHandler(id, builderContext.builderState, builderContext.dispatch)
							}}
							editing={editing} />
					</div>
				</div>
			)}
		</Draggable>
	);
}
 
export default SingleField;