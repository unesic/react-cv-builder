import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FiPlus, FiFolder } from 'react-icons/fi';

import Button from '../../ui/Button/Button';

const AddNew = ({ clicked }) => {

	return (
		<Container className="mt-3">
			<Row>
				<Col className="d-flex justify-content-center">
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