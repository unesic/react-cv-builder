/**
 * **********************************
 * *		Helper functions		*
 * **********************************
 */

/**
 * Retrieves all the necessary data from section ID
 * @param	{Array}		sections	builderState - sections
 * @param	{String}	id			section ID
 * @returns	{Object}	section, sectionIndex
 */
export const getDataFromSectionId = (sections, id) => {
	let result;

	[...sections].forEach((section, sectionIndex) => {
		if (section.id === id) {
			result = {
				section: section,
				sectionIndex: sectionIndex
			}
		}
	})

	return result;
}

/**
 * Retrieves all the necessary data from column ID
 * @param	{Array}		sections	builderState - sections
 * @param	{String}	id			column ID
 * @returns	{Object}	section, sectionIndex, column, columnIndex
 */
export const getDataFromColumnId = (sections, id) => {
	let result;

	[...sections].forEach((section, sectionIndex) => {
		[...section.columns].forEach((column, columnIndex) => {
			if (column.id === id) {
				result = {
					section: section,
					sectionIndex: sectionIndex,
					column: column,
					columnIndex: columnIndex
				}
			}
		})
	})

	return result;
}

/**
 * Retrieves all the necessary data from field ID
 * @param	{Array}		sections	builderState - sections
 * @param	{String}	id			field ID
 * @returns	{Object}	section, sectionIndex, column, columnIndex, field, fieldIndex
 */
export const getDataFromFieldId = (sections, id) => {
	let result;

	[...sections].forEach((section, sectionIndex) => {
		[...section.columns].forEach((column, columnIndex) => {
			[...column.fields].forEach((field, fieldIndex) => {
				if (field.id === id) {
					result = {
						section: section,
						sectionIndex: sectionIndex,
						column: column,
						columnIndex: columnIndex,
						field: field,
						fieldIndex: fieldIndex
					}
				}
			})
		})
	})

	return result;
}