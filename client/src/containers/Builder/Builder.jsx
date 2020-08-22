import React, { useReducer, useEffect, createContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Spinner } from "react-bootstrap";

import reducer from "./reducer";
import styles from "./Builder.module.css";

import {
	prepareModalFields,
	newContainerHandler,
	backdropClickedHandler,
	onDragStart,
	onDragEnd,
} from "./builder.utils";

import Topbar from "../../ui/Topbar/Topbar";
import Paper from "../Paper/Paper";
import AddNew from "../../components/AddNew/AddNew";
import Section from "../../components/Section/Section";
import UpdatedFields from "../../components/Fields/UpdatedFields/UpdatedFields";
import Modal from "../../ui/Modal/Modal";
import ModalContent from "../../components/ModalContent/ModalContent";

export const BuilderContext = createContext();

const Builder = ({ page, error, loading }) => {
	const [builderState, dispatch] = useReducer(reducer, {
		dragging: undefined,
		modifying: null,
		modalOpen: false,
		modalFields: [],
		modalProperties: {},
		activeField: undefined,
		sections: [],
		parsedSections: [],
	});

	useEffect(() => {
		if (page.data) {
			const parsedData = JSON.parse(page.data.replace(/'/g, '"'));
			dispatch({
				type: "NEW_SECTION",
				payload: parsedData,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	useEffect(() => {
		const newParsedSections = [];
		builderState.sections.forEach((section, i) => {
			newParsedSections.push(
				<Section key={section.id} {...section} index={i} />
			);
		});

		dispatch({
			type: "PARSED_SECTIONS",
			payload: newParsedSections,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(builderState.sections)]);

	useEffect(() => {
		!builderState.modalOpen &&
			dispatch({
				type: "MODIFYING",
				payload: null,
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(builderState.modalOpen)]);

	// Upon clicking the 'modify' button, prepare properties for modal
	useEffect(() => {
		if (builderState.modifying !== null) {
			const active = prepareModalFields(
				builderState.sections,
				builderState.modifying
			);

			dispatch({
				type: "MODAL_PROPERTIES_ACTIVE_FIELD",
				payload: {
					modalProperties: active ? active.customStyles : null,
					activeField: active,
				},
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(builderState.modifying)]);

	// Updates modal fields when modal properties change
	useEffect(() => {
		const updatedFields = (
			<UpdatedFields
				fields={
					builderState.activeField
						? { ...builderState.activeField.customStyles }
						: null
				}
				properties={{ ...builderState.modalProperties }}
			/>
		);

		dispatch({
			type: "MODAL_FIELDS",
			payload: updatedFields,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(builderState.modalProperties)]);

	return (
		<BuilderContext.Provider
			value={{
				pageInfo: { ...page },
				builderState: builderState,
				dispatch: dispatch,
			}}
		>
			<Topbar />
			<div className={styles.Builder}>
				<DragDropContext
					onDragStart={(res) => {
						onDragStart(res, builderState, dispatch);
					}}
					onDragEnd={(res) => {
						onDragEnd(res, builderState, dispatch);
					}}
				>
					<Paper dragging={builderState.dragging}>
						{loading ? (
							<div style={{ textAlign: "center" }}>
								<Spinner animation="border" />
							</div>
						) : builderState.parsedSections ? (
							builderState.parsedSections
						) : null}
						<AddNew
							clicked={() =>
								newContainerHandler(builderState, dispatch)
							}
						/>
					</Paper>
				</DragDropContext>

				<Modal
					isVisible={builderState.modalOpen}
					backdropClicked={() => {
						backdropClickedHandler(builderState, dispatch);
					}}
				>
					<ModalContent />
				</Modal>
			</div>
		</BuilderContext.Provider>
	);
};

export default Builder;
