import React, { useContext } from 'react';
import styles from './ModalContent.module.css';

import { BuilderContext } from '../../containers/Builder/Builder';
import { saveProperties } from '../../containers/Builder/builder.utils';

import { FiSave, FiX } from 'react-icons/fi';
import Button from '../../ui/Button/Button';

const ModalContent = _ => {
	const context = useContext(BuilderContext);
	return (
		<React.Fragment>
			{context.builderState.modalFields}
			<div className={styles.ModalButtons}>
				<Button
					TextWithIcon
					type='Save'
					clicked={_ => {
						saveProperties(context.builderState, context.dispatch)
					}}>
					<FiSave /> Save
				</Button>
				<Button
					TextWithIcon
					type='Cancel'
					clicked={_ => {
						context.setBuidlerState({
							...context.builderState,
							modalOpen: false
						})
					}}
				>
					<FiX /> Cancel
				</Button>
			</div>
		</React.Fragment>
	);
}
 
export default ModalContent;