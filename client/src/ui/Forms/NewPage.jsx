import React, { useState, useContext } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

import { AppContext } from '../../App';

const NewPage = _ => {
	const context = useContext(AppContext);
	const [pageTitle, setPageTitle] = useState('');

	const createPage = async e => {
		e.preventDefault();
		await context.Page.create(context.state.data.user._id, pageTitle);
		context.setModalOpen(false);
		context.setNewPageAdded(true);
	}

	return (
		<Card>
			<Card.Body>
				<Form className="p-2" onSubmit={createPage}>
					<Form.Group controlId="page_title">
						<Form.Label>Page title</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter page title"
							value={pageTitle}
							onChange={e => setPageTitle(e.target.value)} />
					</Form.Group>
					
					<Button variant="primary" type="submit">Create</Button>
				</Form>
			</Card.Body>
		</Card>
	);
}
 
export default NewPage;