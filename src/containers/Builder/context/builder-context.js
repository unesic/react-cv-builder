import React from 'react';

export default React.createContext({
	fields: [],
	modalFields: [],
	showFieldTypes: false,
	modifying: null,
	setModalOpen: _ => {},
	setShowFieldTypes: _ => {},
	beautifyFieldHandler: _ => {},
	deleteFieldHandler: _ => {},
	addNewFieldHandler: _ => {},
	saveProperties: _ => {},
});