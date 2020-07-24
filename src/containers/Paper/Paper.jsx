import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import styles from './Paper.module.css';

const Paper = ({ children }) => {
	return (
		<Droppable droppableId={'paper'}>
			{(provided, snapshot) => (
				<div
					className={[
						styles.Paper,
						snapshot.isDraggingOver ? styles.IsDraggingOver : ''
					].join(' ')}
					ref={provided.innerRef}
					{...provided.droppableProps}
				>
					{children}
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	);
}
 
export default Paper;