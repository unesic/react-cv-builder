import React, { useContext } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { FiPlus, FiSave } from 'react-icons/fi';

import { AppContext } from '../../App';
import { BuilderContext } from '../../containers/Builder/Builder';
import NewPage from '../Forms/NewPage';

const Topbar = (props) => {
	const context = useContext(AppContext);
	const builderContext = useContext(BuilderContext);

	async function savePage() {
		const id = builderContext.pageInfo._id;
		const pageData = [...builderContext.sections];

		const res = await context.Page.save(id, pageData);
		console.log(res);
	}

	return (
		<Navbar bg="light" expand="lg" style={{
			gridArea: 'topbar'
		}}>
			<Navbar.Brand href="#">{context.state.data ? context.state.data.user.username : null}</Navbar.Brand>
  			<Navbar.Toggle aria-controls="topbar" />
  			<Navbar.Collapse id="topbar">
			
				<Nav className="mr-auto">
					<Nav.Item className="mx-2"><Link to="/">Home</Link></Nav.Item>

					{
						!context.state.data ? (
							<>
								<Nav.Item className="mx-2"><Link to="/signup">Sign Up</Link></Nav.Item>
								<Nav.Item className="mx-2"><Link to="/signin">Sign In</Link></Nav.Item>
							</>
						) : (
							<>
								<Nav.Item className="mx-2">
									<Link to="/" onClick={_ => {
										context.Auth.logout()
										context.dispatch({type: 'USER_LOGOUT'})
									}}>
										Sign Out
									</Link>
								</Nav.Item>
								<Nav.Item className="mx-2"><Link to="/pages">Pages</Link></Nav.Item>
							</>
						)
					}
					
				</Nav>
			</Navbar.Collapse>
			{
				context.requestedPage ? (
					<Button onClick={savePage}>
						<FiSave /> Save page
					</Button>
				) : (
					<Button onClick={_ => {
						context.setModalOpen(true)
						context.setModalContent(<NewPage />)
					}}>
						<FiPlus /> New page
					</Button>
				)
			}
		</Navbar>
	);
}
 
export default withRouter(Topbar);