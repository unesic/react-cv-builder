export default styles => {
	const stylesProperties = {};

	Object.keys(styles).forEach(cKey => {
		const category = styles[cKey];
		Object.keys(category).forEach(scKey => {
			const subcategory = category[scKey].values;
			Object.keys(subcategory).forEach(pKey => {
				const property = subcategory[pKey];
				stylesProperties[pKey] = property.value;
			})
		})
	})

	return stylesProperties;
};