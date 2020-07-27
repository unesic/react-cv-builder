const getDataFromSectionId = (sections, id) => {
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

const getDataFromColumnId = (sections, id) => {
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

const getDataFromFieldId = (sections, id) => {
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

export const reorderSections = (sections, src, dest) => {
	const newSections = [...sections];
	const [moved] = newSections.splice(src.index, 1);
	newSections.splice(dest.index, 0, moved);

	return [...newSections];
}

export const reorderColumns = (sections, src, dest, draggableId) => {
	const newSections = [...sections];

	const {
		section: src_section,
		sectionIndex: src_sectionIndex
	} = getDataFromColumnId(newSections, draggableId);
	const src_columns = [...src_section.columns];
	const [moved] = src_columns.splice(src.index, 1);
	newSections[src_sectionIndex].columns = [...src_columns];

	const {
		section: dest_section,
		sectionIndex: dest_sectionIndex
	} = getDataFromSectionId(newSections, dest.droppableId);
	const dest_columns = [...dest_section.columns];
	dest_columns.splice(dest.index, 0, moved);

	newSections[dest_sectionIndex].columns = [...dest_columns];

	return [...newSections];
}

export const reorderFields = (sections, src, dest, draggableId) => {
	const newSections = [...sections];

	const {
		section: src_section,
		sectionIndex: src_sectionIndex,
		column: src_column,
		columnIndex: src_columnIndex
	} = getDataFromFieldId(newSections, draggableId);
	const src_fields = [...src_column.fields];
	const [moved] = src_fields.splice(src.index, 1);
	src_column.fields = [...src_fields];
	src_section.columns[src_columnIndex] = {...src_column};
	newSections[src_sectionIndex] = {...src_section};

	const {
		section: dest_section,
		sectionIndex: dest_sectionIndex,
		column: dest_column,
		columnIndex: dest_columnIndex
	} = getDataFromColumnId(newSections, dest.droppableId);
	const dest_fields = [...dest_column.fields];
	dest_fields.splice(dest.index, 0, moved);
	dest_column.fields = [...dest_fields];
	dest_section.columns[dest_columnIndex] = {...dest_column};

	newSections[dest_sectionIndex] = {...dest_section};

	return [...newSections];
}

export const duplicateSection = (sections, sectionId) => {
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

	return {
		section: {...newSection},
		index: sectionIndex + 1
	};
}

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

export const duplicateField = (sections, fieldId) => {
	const {column, field, fieldIndex} = getDataFromFieldId([...sections], fieldId);
	const newField = {...field};
	newField.id = 'field-id-' + new Date().valueOf();
	column.fields.splice(fieldIndex + 1, 0, {...newField});

	return [...column.fields]
}