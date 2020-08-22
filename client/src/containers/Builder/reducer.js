export default (state, action) => {
	switch (action.type) {
		case "NEW_SECTION":
			return {
				...state,
				sections: action.payload,
			};
		case "PARSED_SECTIONS":
			return {
				...state,
				parsedSections: action.payload,
			};
		case "MODIFYING":
			return {
				...state,
				modifying: action.payload,
			};
		case "MODAL_PROPERTIES_ACTIVE_FIELD":
			return {
				...state,
				modalProperties: action.payload.modalProperties,
				activeField: action.payload.activeField,
			};
		case "MODAL_FIELDS":
			return {
				...state,
				modalFields: action.payload,
			};
		case "MODAL_OPEN":
			return {
				...state,
				modalOpen: action.payload,
			};
		case "DRAGGING":
			return {
				...state,
				dragging: action.payload,
			};
		case "MODIFYING_MODAL_OPEN":
			return {
				...state,
				modifying: action.payload.modifying,
				modalOpen: action.payload.modalOpen,
			};
		case "MODIFYING_MODAL_OPEN_SECTIONS":
			return {
				...state,
				modifying: action.payload.modifying,
				modalOpen: action.payload.modalOpen,
				sections: action.payload.sections,
			};
		case "MODAL_PROPERTIES":
			return {
				...state,
				modalProperties: action.payload,
			};
		default:
			return state;
	}
};
