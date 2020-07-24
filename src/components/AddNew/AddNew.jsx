import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FiPlus, FiFolder } from 'react-icons/fi';

import Button from '../../ui/Button/Button';

const AddNew = ({ clicked }) => {

	return (
		<Container>
			<Row>
				<Col>
					<Button
						type='Add'
						clicked={clicked}
					>
						<FiPlus /><FiFolder />
					</Button>
				</Col>
			</Row>
		</Container>
	);
}
 
export default AddNew;