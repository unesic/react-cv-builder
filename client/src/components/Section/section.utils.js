import { getDataFromSectionId, getDataFromColumnId, getDataFromFieldId } from './helpers.utils'

/**
 * **************************************
 * *		All duplication logic		*
 * **************************************
 */

/**
 * Section duplication logic
 * @param	{Array}		sections	builderState sections
 * @param	{String}	sectionId	section ID
 * @returns	{Array}		updated sections array
 */
export const duplicateSection = (sections, sectionId) => {
	const originalSections = [...sections];
	
	const flushIds = section => {
		const newColumns = [...section.columns].map((column, i) => ({
			id: 'column-id-' + new Date().valueOf() + i,
			fields: [...column.fields].map((field, j) => ({
				id: 'field-id-' + new Date().valueOf() + i + j,
				data: field.data,
				type: field.type,
				customStyles: {...field.customStyles}
			}))
		}))
	
		const newSection = {
			id: 'section-id-' + new Date().valueOf(),
			columns: [...newColumns],
		}
	
		return {...newSection};
	}

	const {section, sectionIndex} = getDataFromSectionId([...sections], sectionId);
	const newSection = flushIds(section);

	originalSections.splice(sectionIndex + 1, 0, {...newSection});
	return originalSections;
}

/**
 * Column duplication logic
 * @param	{Array}		sections	builderState sections
 * @param	{String}	columnId	column ID
 * @returns	{Array}		updated columns array
 */
export const duplicateColumn = (sections, columnId) => {
	const flushIds = column => {
		const newFields = [...column.fields].map((field, i) => ({
			id: 'field-id-' + new Date().valueOf() + i,
			data: field.data,
			type: field.type,
			customStyles: {...field.customStyles}
		}))
	
		const newColumn = {
			id: 'column-id-' + new Date().valueOf(),
			fields: [...newFields],
		}
	
		return {...newColumn};
	}

	const {section, column, columnIndex} = getDataFromColumnId([...sections], columnId);
	const newColumn = flushIds(column);
	section.columns.splice(columnIndex + 1, 0, {...newColumn});

	return [...section.columns];
}

/**
 * Field duplication logic
 * @param	{Array}		sections	builderState sections
 * @param	{String}	fieldId		field ID
 * @returns	{Array}		updated fields array
 */
export const duplicateField = (sections, fieldId) => {
	const {column, field, fieldIndex} = getDataFromFieldId([...sections], fieldId);
	const newField = {...field};
	newField.id = 'field-id-' + new Date().valueOf();
	column.fields.splice(fieldIndex + 1, 0, {...newField});

	console.log(newField)

	return [...column.fields]
}