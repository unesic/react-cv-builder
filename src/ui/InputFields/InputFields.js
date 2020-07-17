import React from 'react';
import styles from './InputFields.module.css';

const Fieldset = ({ value, children }) => {
	return (
		<fieldset className={[
			styles.Fieldset,
			!value ? styles.Empty : ''
		].join(' ')}>
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