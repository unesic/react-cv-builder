import React from 'react';
import styles from './Modal.module.css';

import Backdrop from './Backdrop/Backdrop';

const Modal = ({ isVisible, backdropClicked, children }) => {
	const classes = `
	${styles.Modal}
	${isVisible ?
		styles.Show : styles.Hide}`;

	return (
		<React.Fragment>
			<div className={classes} draggable={true} droppable={true}>
				{children}
			</div>
			<Backdrop
				show={isVisible}
				clicked={backdropClicked} />
		</React.Fragment>
	);
}
 
export default Modal;