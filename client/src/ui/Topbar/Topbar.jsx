import React, { useContext } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

import { AppContext } from '../../App';
import NewPage from '../Forms/NewPage';

const Topbar = _ => {
	const context = useContext(AppContext);

	return (
		<Navbar bg="light" expand="lg">
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
							<Nav.Item className="mx-2">
								<Link to="/" onClick={_ => {
									context.Auth.logout()
									context.dispatch({type: 'USER_LOGOUT'})
								}}>
									Sign Out
								</Link>
							</Nav.Item>
						)
					}
					
				</Nav>
			</Navbar.Collapse>
			<Button onClick={_ => {
				context.setModalOpen(true)
				context.setModalContent(<NewPage />)
			}}>
				<FiPlus /> New page
			</Button>
		</Navbar>
	);
}
 
export default Topbar;