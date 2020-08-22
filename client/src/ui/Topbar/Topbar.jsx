import React, { useState, useContext, useEffect } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { FiPlus, FiSave, FiEdit } from "react-icons/fi";

import { AppContext } from "../../App";
import { BuilderContext } from "../../containers/Builder/Builder";
import NewPage from "../Forms/NewPage";

const Topbar = (props) => {
	const [state, setState] = useState({
		loading: true,
		status: null,
		message: "",
	});
	const context = useContext(AppContext);
	const builderContext = useContext(BuilderContext);

	const savePage = async () => {
		const id = context.pageData.payload.page._id;
		const pageData = [...builderContext.builderState.sections];
		const res = await context.Page.save(id, pageData);
		console.log(builderContext.builderState.sections);
	};

	useEffect(() => {
		setState({
			...state,
			loading: false,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [context.pageData]);

	return (
		<Navbar
			bg="light"
			expand="lg"
			style={{
				gridArea: "topbar",
			}}
		>
			<Navbar.Brand href="#">
				{context.state.data ? context.state.data.user.username : null}
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="topbar" />
			<Navbar.Collapse id="topbar">
				<Nav className="mr-auto">
					<Nav.Item className="mx-2">
						<Link to="/">Home</Link>
					</Nav.Item>

					{!context.state.data ? (
						<>
							<Nav.Item className="mx-2">
								<Link to="/signup">Sign Up</Link>
							</Nav.Item>
							<Nav.Item className="mx-2">
								<Link to="/signin">Sign In</Link>
							</Nav.Item>
						</>
					) : (
						<>
							<Nav.Item className="mx-2">
								<Link
									to="/"
									onClick={() => {
										context.Auth.logout();
										context.dispatch({
											type: "USER_LOGOUT",
										});
									}}
								>
									Sign Out
								</Link>
							</Nav.Item>
							<Nav.Item className="mx-2">
								<Link to="/pages">Pages</Link>
							</Nav.Item>
						</>
					)}
				</Nav>
			</Navbar.Collapse>

			{context.pageMode === "edit" ? (
				<Button onClick={_ => savePage()}>
					<FiSave /> Save page
				</Button>
			) : context.pageMode === "preview" ? (
				context.pageData && context.pageData.payload.isOwner ? (
					<Button
						onClick={() => {
							props.history.push(
								`${props.location.pathname}?pid=${context.pageData.payload.page._id}&edit=1`
							);
						}}
					>
						<FiEdit /> Edit page
					</Button>
				) : null
			) : !context.pageMode ? (
				<Button
					onClick={() => {
						context.setModalOpen(true);
						context.setModalContent(<NewPage />);
					}}
				>
					<FiPlus /> New page
				</Button>
			) : null}
		</Navbar>
	);
};

export default withRouter(Topbar);
