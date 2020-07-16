import React from 'react';
import styles from './InputFields.module.css';

const Fieldset = ({ value, children }) => {
	const classes = `
	${styles.Fieldset}
	${value ? '' : styles.Empty }`;
	
	return (
		<fieldset className={classes}>
			{children}
		</fieldset>
	);
}

const Label = ({ labels, children }) => {
	return (
		<label
			className={styles.Label}
			htmlFor={labels}>
			{children}
		</label>
	);
}

const Text = props => {
	return (
		<input type='text'
			className={styles.Text}
			{...props} />
	);
}

const TextArea = props => {
	return (
		<textarea
			className={styles.TextArea}
			{...props} />
	);
}

export { Fieldset, Label, Text, TextArea };