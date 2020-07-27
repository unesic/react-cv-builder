import React, { useState, useEffect, useRef, useContext } from 'react';
import { Container, Row } from 'react-bootstrap';
import { FiPlus, FiColumns, FiTrash, FiCopy } from 'react-icons/fi';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import styles from './Section.module.css';

import * as SectionUtils from './helper-functions';
import builderContext from '../../containers/Builder/context/builder-context';
import SectionContext from './section-context';

import Button from '../../ui/Button/Button';
import Column from '../Column/Column';

const Section = ({ id, columns, index }) => {
	const [data, setData] = useState([]);
	const [cols, setCols] = useState();
	const isMounted = useRef(false);
	const context = useContext(builderContext);
	
	useEffect(_ => {
		const initialData = [];
		if (columns.length) {
			columns.forEach(column => {
				initialData.push({...column})
			})
		}

		setData(initialData);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(columns)]);

	useEffect(_ => {
		if (isMounted.current) {
			const newCols = [];
			data.forEach((column, i) => (
				newCols.push(<Column key={column.id} {...column} index={i} />)
			))

			setCols(newCols);
		} else {
			isMounted.current = true;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	const newColumnHandler = _ => {
		const newData = data ? data.map(f => ({...f})) : [];

		newData.push({
			id: 'column-id-' + new Date().valueOf(),
			fields: [],
		})

		setData(newData);
		context.setSectionData(id, newData);
	}

	const updateColumnData = (columnId, updatedData) => {
		if (updatedData.length) {
			const newData = data.map(c => ({...c}));
			const current = newData.find(column => column.id === columnId);
			const old = data.find(column => column.id === columnId);
			const index = newData.indexOf(current);
			current.fields = [...updatedData]
			
			if ({...current}.fields !== {...old}.fields) {
				newData[index] = current;
				setData(newData);
				context.setSectionData(id, newData);
			}
		}
	}

	const duplicateColumnHandler = columnId => {
		const newData = SectionUtils.duplicateColumn(context.sections, columnId);
		setData(newData);
		context.setSectionData(id, newData);
	}

	const deleteColumnHandler = columnId => {
		const newData = [...data].filter(column => column.id !== columnId);
		setData(newData);
		context.setSectionData(id, newData);
	}

	return (
		<Draggable draggableId={id} index={index}>
			{(provided, snapshot) => (
				<Container
					className={styles.Section}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
				>
					<Droppable
						droppableId={id}
						isDropDisabled={context.dragging !== 'section'}
						direction="horizontal"
						type="section"
					>
						{(provided, snapshot) => (
							<Row
								ref={provided.innerRef}
								{...provided.droppableProps}
							>
								<SectionContext.Provider
									value={{
										updateColumnData: updateColumnData,
										deleteColumnHandler: deleteColumnHandler,
										duplicateColumnHandler: duplicateColumnHandler,
									}}
								>
									{cols ? cols : null}
								</SectionContext.Provider>
								{provided.placeholder}
							</Row>
						)}
					</Droppable>
					<Button
						type='Add'
						clicked={newColumnHandler}
					>
						<FiPlus /><FiColumns />
					</Button>
					<Button
						type='Delete'
						clicked={_ => context.deleteSectionHandler(id)}
					>
						<FiTrash />
					</Button>
					<Button
						type='Add'
						clicked={_ => context.duplicateSectionHandler(id)}
					>
						<FiCopy/>
					</Button>
				</Container>
			)}
		</Draggable>
	);
}
 
export default Section;