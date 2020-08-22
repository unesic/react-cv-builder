import {
	reorder,
	getUpdatedData,
	getUpdatedModalProperties,
	addNewSection,
	getSectionsWithUpdatedFieldStyles,
} from "./helpers.utils";
import { duplicateSection } from "../../components/Section/section.utils";

/**
 * Prepares modal fields when a field is being modified
 * @param {Array}	sections	builderState sections
 * @param {String}	modifying	currently modifying field ID
 */
export const prepareModalFields = (sections, modifying) => {
	let activeField = null;
	sections.forEach((section) => {
		section.columns.forEach((column) => {
			column.fields.forEach((field) => {
				if (field.id === modifying) {
					activeField = { ...field };
				}
			});
		});
	});
	return activeField;
};

/**
 * Responsible for all kinds of builderState sections updating
 * @param {String}		id				section ID
 * @param {Object}		newData			new section data
 * @param {Object}		builderState	used for updating `sections`
 * @param {Function}	dispatch	updates State
 */
export const setSectionData = (id, newData, builderState, dispatch) => {
	const newSections = getUpdatedData(builderState.sections, id, newData);
	newSections &&
		dispatch({
			type: "NEW_SECTION",
			payload: newSections,
		});
};

/**
 * **************************************
 * *		All kinds of handlers		*
 * **************************************
 */

/**
 * Handles adding new section
 * @param {Object}		builderState	used for updating `sections`
 * @param {Function}	dispatch	updates state
 */
export const newContainerHandler = (builderState, dispatch) => {
	const newSections = addNewSection(builderState.sections);
	dispatch({
		type: "NEW_SECTION",
		payload: newSections,
	});
};

/**
 * Handles deleting section
 * @param {String}		sectionId		deleted section ID
 * @param {Object}		builderState	used for updating `sections`
 * @param {Function}	dispatch	updates state
 */
export const deleteSectionHandler = (sectionId, builderState, dispatch) => {
	const newSections = [...builderState.sections].filter(
		(section) => section.id !== sectionId
	);
	dispatch({
		type: "NEW_SECTION",
		payload: newSections,
	});
};

/**
 * Handles duplicating section
 * @param {String}		sectionId		duplicated section ID
 * @param {Object}		builderState	used for updating `sections`
 * @param {Function}	dispatch	updates state
 */
export const duplicateSectionHandler = (sectionId, builderState, dispatch) => {
	const newSections = duplicateSection(builderState.sections, sectionId);
	dispatch({
		type: "NEW_SECTION",
		payload: newSections,
	});
};

/**
 * Sets the currently mofifying's field ID in state, opens modal
 * @param {String}		id				beautifying field ID
 * @param {Object}		builderState	used for updating `modifying`, `modalOpen`
 * @param {Function}	dispatch	updates state
 */
export const beautifyFieldHandler = (id, builderState, dispatch) => {
	dispatch({
		type: "MODIFYING_MODAL_OPEN",
		payload: {
			modifying: id,
			modalOpen: true,
		},
	});
};

/**
 * Updates modal properties with field's input value
 * @param {Event}		e				input field
 * @param {Object}		builderState	used for updating `modalProperties`
 * @param {Function}	dispatch	updates state
 */
export const propertyChangeHandler = (e, builderState, dispatch) => {
	const updated = getUpdatedModalProperties(builderState.modalProperties, e);
	dispatch({
		type: "MODAL_PROPERTIES",
		payload: updated,
	});
};

/**
 * Saves the properties from modal and updates the state and closes modal
 * @param {Object}		builderState	used for updating `modifying`, `modalOpen`, `sections`
 * @param {Function}	dispatch	updates state
 */
export const saveProperties = (builderState, dispatch) => {
	const newSections = getSectionsWithUpdatedFieldStyles(
		builderState.activeField,
		builderState.modalProperties,
		builderState.sections
	);
	dispatch({
		type: "MODIFYING_MODAL_OPEN_SECTIONS",
		payload: {
			modifying: null,
			modalOpen: false,
			sections: newSections,
		},
	});
};

/**
 * On backdrop click close the modal
 * @param {Object}		builderState	used for updating `modalOpen`
 * @param {Function}	dispatch	updates state
 */
export const backdropClickedHandler = (builderState, dispatch) => {
	dispatch({
		type: "MODAL_OPEN",
		payload: false,
	});
};

/**
 * **********************************************
 * *		Drag and drop context functions		*
 * **********************************************
 */

/**
 * Updates state when drag event fires
 * @param {String}		result			determines which element is being dragged
 * @param {Object}		builderState	used for updating `dragging`
 * @param {Function}	dispatch	updates state with dragging type
 */
export const onDragStart = (result, builderState, dispatch) => {
	dispatch({
		type: "DRAGGING",
		payload: result.type,
	});
};

/**
 * Updates state and reorders when drag event is over and drop is fired
 * @param {String}		result			determines which element is dropped
 * @param {Object}		builderState	used for updating `sections`
 * @param {Function}	dispatch	updates state with dragging type
 */
export const onDragEnd = (result, builderState, dispatch) => {
	if (!result.destination) return;

	const { type, source, destination, draggableId } = result;
	const newSections = reorder(
		type,
		builderState.sections,
		source,
		destination,
		draggableId
	);
	dispatch({
		type: "NEW_SECTION",
		payload: newSections,
	});
};
