export default styles => {
	// const capitalize = string => (string.charAt(0).toUpperCase() + string.slice(1))

	// const allStyles = styles ? Object.keys(styles)
	// 	.map(key => ({...styles[key]})) : null

	const stylesProperties = {};

	// allStyles.forEach(category => {
	// 	Object.keys(category).forEach(key => {
	// 		Object.keys(category[key]).forEach(_ => {
	// 			if (category[key].value === '') {
	// 				const value = category[key].value;
	// 				stylesProperties[key] = value;
	// 			} else if (category[key].values) {
	// 				Object.keys(category[key].values).forEach(k => {
	// 					const value = category[key].values[k].value;
	// 					stylesProperties[`${key}${capitalize(k)}`] = value;
	// 				})
	// 			}
	// 		})
	// 	})
	// })

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