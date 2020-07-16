import React from 'react';
import styles from './FieldTypes.module.css';

import { FiType, FiImage, FiList } from 'react-icons/fi';

import Button from '../../ui/Button/Button';

const FieldTypes = ({show, newFieldHandler}) => {
	const classes = `
		${styles.FieldTypes}
		${show ? styles.Show : styles.Hide}
	`;

	return (
		<div className={classes}>
			<Button
				FieldButton
				type='Add'
				clicked={_ => newFieldHandler('text')}><FiType /></Button>
			<Button
				FieldButton
				type='Add'
				clicked={_ => newFieldHandler('list')}><FiList /></Button>
			<Button
				FieldButton
				type='Add'
				clicked={_ => newFieldHandler('image')}><FiImage /></Button>
			</div>
		);
}
 
export default FieldTypes;