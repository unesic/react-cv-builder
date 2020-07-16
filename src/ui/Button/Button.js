import React from 'react';
import styles from './Button.module.css';

const Button = ({ TextWithIcon, FieldButton, Active, type, customStyles, clicked, children }) => {
	const classes = `
		${styles.Button}
		${Active ? styles.Active : ''}
		${styles[type]}
		${customStyles}
		${TextWithIcon ? styles.TextWithIcon : ''}
		${FieldButton ? styles.FieldButton : ''}
	`;
	
	return (
		<button
			className={classes}
			onClick={clicked}>{children}</button>
	);
}
 
export default Button;