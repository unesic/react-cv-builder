import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Table, Spinner } from "react-bootstrap";
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";

import { AppContext } from "../../App";

const UserPages = (props) => {
	const [pages, setPages] = useState(null);
	const [loading, setLoading] = useState(false);
	const context = useContext(AppContext);

	useEffect(() => {
		if (!context.state.data) {
			!context.state.loading &&
				props.history.push({
					pathname: "/signin",
					state: {
						from: props.location.pathname,
					},
				});
		} else {
			getPages();
			setLoading(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [context.isAppMounted]);

	useEffect(() => {
		if (context.state.data) {
			getPages();
			context.setNewPageAdded(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [context.newPageAdded]);

	async function getPages() {
		const res = await context.Page.getPagesFromUserId(context.jwt);
		const { payload } = await res;
		setPages(payload);
	}

	async function deletePage(id) {
		await context.Page.delete(id);
		getPages();
	}

	return (
		<Container>
			<Row>
				<Col className="d-flex justify-content-center">
					{loading ? (
						<Spinner animation="border" />
					) : (
						<Table striped bordered hover variant="dark">
							<thead>
								<tr>
									<th>ID</th>
									<th>Page title</th>
									<th>Options</th>
								</tr>
							</thead>
							<tbody>
								{pages !== null
									? pages.map((page) => (
											<tr key={page._id}>
												<td>{page._id}</td>
												<td>{page.title}</td>
												<td>
													<Link
														to={`/${context.state.data.user.username}/${page.slug}`}
														className="mx-2"
													>
														<FiEye />
													</Link>
													<Link
														to={`/${context.state.data.user.username}/${page.slug}?pid=${page._id}&edit=1`}
														className="mx-2"
													>
														<FiEdit />
													</Link>
													<Link
														to={"/pages"}
														onClick={() =>
															deletePage(page._id)
														}
														className="mx-2"
													>
														<FiTrash2 />
													</Link>
												</td>
											</tr>
									  ))
									: null}
							</tbody>
						</Table>
					)}
				</Col>
			</Row>
		</Container>
	);
};

export default UserPages;
