import React, {
	useState,
	useEffect,
	useRef,
	useContext,
	createContext,
} from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FiPlus, FiColumns, FiTrash, FiCopy } from "react-icons/fi";
import { Droppable, Draggable } from "react-beautiful-dnd";

import styles from "./Section.module.css";

import { duplicateColumn } from "./section.utils";
import {
	deleteSectionHandler,
	duplicateSectionHandler,
	setSectionData,
} from "../../containers/Builder/builder.utils";
import { BuilderContext } from "../../containers/Builder/Builder";

import Button from "../../ui/Button/Button";
import Column from "../Column/Column";

export const SectionContext = createContext();

const Section = ({ id, columns, index }) => {
	const [data, setData] = useState([]);
	const [cols, setCols] = useState();
	const isMounted = useRef(false);
	const context = useContext(BuilderContext);

	useEffect(
		() => {
			const initialData = [];
			if (columns.length) {
				columns.forEach((column) => {
					initialData.push({ ...column });
				});
			}

			setData(initialData);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[JSON.stringify(columns)]
	);

	useEffect(
		() => {
			if (isMounted.current) {
				const newCols = [];
				data.forEach((column, i) =>
					newCols.push(
						<Column key={column.id} {...column} index={i} />
					)
				);

				setCols(newCols);
			} else {
				isMounted.current = true;
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		},
		[data]
	);

	const newColumnHandler = () => {
		const newData = data ? data.map((f) => ({ ...f })) : [];

		newData.push({
			id: "column-id-" + new Date().valueOf(),
			fields: [],
		});

		setData(newData);
		setSectionData(
			id,
			newData,
			context.builderState,
			context.dispatch
		);
	};

	const updateColumnData = (columnId, updatedData) => {
		if (updatedData.length) {
			const newData = data.map((c) => ({ ...c }));
			const current = newData.find((column) => column.id === columnId);
			const old = data.find((column) => column.id === columnId);
			const index = newData.indexOf(current);
			current.fields = [...updatedData];

			if ({ ...current }.fields !== { ...old }.fields) {
				newData[index] = current;
				setData(newData);
				setSectionData(
					id,
					newData,
					context.builderState,
					context.dispatch
				);
			}
		}
	};

	const duplicateColumnHandler = (columnId) => {
		const newData = duplicateColumn(
			context.builderState.sections,
			columnId
		);
		setData(newData);
		setSectionData(
			id,
			newData,
			context.builderState,
			context.dispatch
		);
	};

	const deleteColumnHandler = (columnId) => {
		const newData = [...data].filter((column) => column.id !== columnId);
		setData(newData);
		setSectionData(
			id,
			newData,
			context.builderState,
			context.dispatch
		);
	};

	return (
		<Draggable draggableId={id} index={index}>
			{(provided, snapshot) => (
				<Container
					className={`${styles.Section} mb-2`}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
				>
					<Droppable
						droppableId={id}
						isDropDisabled={
							context.builderState.dragging !== "section"
						}
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

					<Row className={styles.ButtonsRow}>
						<Col className="d-flex justify-content-center my-2">
							<Button clicked={newColumnHandler}>
								<FiPlus />
								<FiColumns />
							</Button>
							<Button
								clicked={() =>
									deleteSectionHandler(
										id,
										context.builderState,
										context.dispatch
									)
								}
							>
								<FiTrash />
							</Button>
							<Button
								clicked={() =>
									duplicateSectionHandler(
										id,
										context.builderState,
										context.dispatch
									)
								}
							>
								<FiCopy />
							</Button>
						</Col>
					</Row>
				</Container>
			)}
		</Draggable>
	);
};

export default Section;
