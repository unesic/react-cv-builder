import React from 'react';
import styles from './Modal.module.css';

import { FiX } from 'react-icons/fi';

import Backdrop from './Backdrop/Backdrop';

const Modal = ({ isVisible, backdropClicked, children }) => {
	const classes = `
		${styles.Modal}
		${isVisible ?
		styles.Show : styles.Hide}
	`;

	return (
		<React.Fragment>
			<div className={classes}>
				{children}
			</div>
			<div className={`${isVisible ? styles.Show : styles.Hide} ${styles.ModalClose}`} onClick={backdropClicked}>
				<FiX />
			</div>
			<Backdrop
				show={isVisible}
				clicked={backdropClicked} />
		</React.Fragment>
	);
}
 
export default Modal;