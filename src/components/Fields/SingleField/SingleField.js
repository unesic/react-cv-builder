import React, { useState, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import styles from './SingleField.module.css';
import BuilderContext from '../../../containers/Builder/context/builder-context';

import advancedStyleParser from '../../../advancedStyleParser/advancedStyleParser';

import FieldButtons from '../FieldButtons/FieldButtons';
import Text from '../AllFields/Text/Text';
import Image from '../AllFields/Image/Image';
import List from '../AllFields/List/List';

const SingleField = ({ index, properties }) => {
	const [editing, setEditing] = useState(true);
	const [data, setData] = useState(undefined);
	const [snapshotData, setSnapshotData] = useState(null);

	useEffect(_ => {
		const defaultData = {
			text: 'Simple text field',
			list: 'List item',
			image: 'https://picsum.photos/500/100'
		}

		setData(defaultData[properties.type]);
		setSnapshotData(defaultData[properties.type]);
	}, [properties.type]);

	const editHandler = _ => {
		setEditing(true);
		setSnapshotData(data);
	}

	const saveHandler = _ => {
		setEditing(false);
		setSnapshotData(null);
	}

	const cancelHandler = _ => {
		setEditing(false);
		setData(snapshotData);
	}

	const onDataChangeHandler = e => {
		setData(e.target.value);
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
		<Draggable draggableId={`field-${properties.id}`} index={index}>
			{(provided, snapshot) => (
				<BuilderContext.Consumer>
					{context => (
						<div
							className={[
								styles.SingleField,
								editing ? styles.Editing : null,
								snapshot.isDragging ? styles.IsDragging : null
							].join(' ')}
							style={advancedStyleParser(properties.styles)}
							{...provided.draggableProps}
							{...provided.dragHandleProps}
							ref={provided.innerRef}
						>
							{allFields[properties.type]}
							<FieldButtons
								fieldId={properties.id}
								onEdit={editHandler}
								onSave={saveHandler}
								onCancel={cancelHandler}
								onDelete={context.deleteFieldHandler}
								onBeautify={context.beautifyFieldHandler}
								editing={editing} />
						</div>
					)}
				</BuilderContext.Consumer>
			)}
		</Draggable>
	);
}
 
export default SingleField;