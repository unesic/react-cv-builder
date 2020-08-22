import { reorderSections, reorderColumns, reorderFields } from './_helpers'

/**
 * Adds a new empty section object to sections array
 * @param	{Array}	sections builderState sections
 * @returns	{Array}	sections array with new section object
 */
export const addNewSection = (sections) => {
	return [
		...sections,
		{
			id: 'section-id-' + new Date().valueOf(),
			columns: [],
		}
	];
}

/**
 * Responsible for updating subject section columns data
 * @param	{Array}		sections	builderState sections
 * @param	{String}	id			section ID
 * @param	{Array}		newData		new columns data
 * @returns {Array}		sections with updated subject section columns
 */
export const getUpdatedData = (sections, id, newData) => {
	const newSections	= [...sections],
		current			= newSections.find(section => section.id === id),
		old				= newSections.find(section => section.id === id),
		index			= newSections.indexOf(current);
	
	current.columns = [...newData];
	newSections[index] = {...current};

	return old.columns !== current.columns ? newSections : false;
}

/**
 * Returns updated modal properties on input field change
 * @param	{Object}	modalProperties	current modalProperties
 * @param	{Event}		e				change input field event
 * @returns	{JSON}		updated modal field properties
 */
export const getUpdatedModalProperties = (modalProperties, e) => {
	const stringified	= JSON.stringify({...modalProperties}),
		regex			= new RegExp(/,"value":"(.*?)"}/, ''),
		fieldIndex		= stringified.indexOf(`"${e.target.name}":`),
		start			= stringified.slice(0, fieldIndex),
		end				= stringified.slice(fieldIndex),
		endUpdated		= end.replace(regex, `,"value":"${e.target.value}"}`);

	return JSON.parse(start + endUpdated);
}

/**
 * Updates active field styles and returns updated sections array
 * @param	{Object}	activeField		activeField
 * @param	{Object}	modalProperties	parsed modalProperties
 * @param	{Array}		sections		buidlerState sections
 * @returns	{Array}		new builderState sections with updated field styles
 */
export const getSectionsWithUpdatedFieldStyles = (activeField, modalProperties, sections) => {
	const updatedActiveField = {...activeField};
	updatedActiveField.customStyles = {...modalProperties};

	const newSections = [...sections];
	newSections.forEach(section => {
		section.columns.forEach(column => {
			column.fields.forEach(field => {
				if (field.id === updatedActiveField.id) {
					field.customStyles = {...updatedActiveField.customStyles}
				}
			})
		})
	})
	return newSections;
}

/**
 * Reorders elements accordingly onDragEnd
 * @param	{String}	type 
 * @param	{Array}		sections 
 * @param	{String}	source 
 * @param	{String}	destination 
 * @param	{String}	draggableId 
 * @returns	{Array}		reordered builderState sections
 */
export const reorder = (type, sections, source, destination, draggableId) => {
	if (type === 'paper')			return reorderSections(sections, source, destination, draggableId);
	else if (type === 'section')	return reorderColumns(sections, source, destination, draggableId);
	else if (type === 'column')		return reorderFields(sections, source, destination, draggableId);
}