import React from 'react';
import styles from './ModalContent.module.css';

import { BuilderContext } from '../../containers/Builder/Builder';

import { FiSave, FiX } from 'react-icons/fi';
import Button from '../../ui/Button/Button';

const ModalContent = _ => {
	return (
		<BuilderContext.Consumer>
			{context => (
				<React.Fragment>
					{context.modalFields}
					<div className={styles.ModalButtons}>
						<Button
							TextWithIcon
							type='Save'
							clicked={context.saveProperties}>
							<FiSave /> Save
						</Button>
						<Button
							TextWithIcon
							type='Cancel'
							clicked={_ => context.setModalOpen(false)}>
							<FiX /> Cancel
						</Button>
					</div>
				</React.Fragment>
			)}
		</BuilderContext.Consumer>
	);
}
 
export default ModalContent;