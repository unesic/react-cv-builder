import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Table, Spinner } from 'react-bootstrap';
import { FiEdit, FiTrash2, FiEye } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { AppContext } from '../../App';

const UserPages = _ => {
	const [pages, setPages] = useState();
	const [parsed, setParsed] = useState(null);
	const [loading, setLoading] = useState(true);
	const context = useContext(AppContext);

	useEffect(() => {
		getPages();
		setLoading(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		getPages();
		context.setNewPageAdded(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [context.newPageAdded]);

	useEffect(() => {
		const parsed = pages ? (
			pages.map(page => (
				<tr key={page._id}>
					<td>{page._id}</td>
					<td>{page.title}</td>
					<td>
						<Link
							to={`/p/${page.slug}`}
							className="mx-2"
						>
							<FiEye />
						</Link>
						<Link
							to={`/e/${page._id}`}
							className="mx-2"
						>
							<FiEdit />
						</Link>
						<Link
							to={'/pages'}
							onClick={_ => deletePage(page._id)}
							className="mx-2"
						>
							<FiTrash2 />
						</Link>
					</td>
				</tr>
			)) ) : null;
			setParsed(parsed);
			// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pages]);

	async function getPages() {
		const res = await context.Page.getPagesFromUserId(context.jwt);
		setPages(res.payload);
	}

	async function deletePage(id) {
		await context.Page.delete(id);
		getPages();
	}

	return (
		<Container>
			<Row>
				<Col className="d-flex justify-content-center">
				{
					loading ? <Spinner animation="border" /> : (
						<Table striped bordered hover variant="dark">
						<thead>
							<tr>
								<th>ID</th>
								<th>Page title</th>
								<th>Options</th>
							</tr>
						</thead>
						<tbody>
							{parsed}
						</tbody>
						</Table>
					)
				}
				</Col>
			</Row>
		</Container>
	);
}
 
export default UserPages;