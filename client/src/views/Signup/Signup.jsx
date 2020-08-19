import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

import { AppContext } from '../../App';

const Signup = (props) => {
	const [user, setUser] = useState({ username: '', email: '', password: '' })
	const context = useContext(AppContext);

	const registerUser = async e => {
		e.preventDefault();
		const res = await context.Auth.register(user);
		localStorage.setItem('jwt_token', res.payload.token);
		context.dispatch(res);
			
		const previousLocation = props.location.state;

		if (previousLocation) {
			props.history.push(previousLocation.from);
		} else {
			props.history.push('/');
		}
	}

	const handleEmail = e => {
		setUser({
			...user,
			email: e.target.value
		})
	}

	const handleUsername = e => {
		setUser({
			...user,
			username: e.target.value
		})
	}

	const handlePassword = e => {
		setUser({
			...user,
			password: e.target.value
		})
	}

	return (
		<Container className="my-5">
			<Row>
				<Col>
					<Card>
						<Card.Body>
							<Form className="p-2" onSubmit={registerUser}>
								<Form.Group controlId="signup_username">
									<Form.Label>Username</Form.Label>
									<Form.Control type="text" placeholder="Enter username" value={user.username} onChange={handleUsername} />
								</Form.Group>

								<Form.Group controlId="signup_email">
									<Form.Label>Email address</Form.Label>
									<Form.Control type="email" placeholder="Enter email" value={user.email} onChange={handleEmail} />
								</Form.Group>

								<Form.Group controlId="signup_password">
									<Form.Label>Password</Form.Label>
									<Form.Control type="password" placeholder="Password" value={user.password} onChange={handlePassword} />
								</Form.Group>
								
								<Button variant="primary" type="submit">Register</Button>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}
 
export default Signup;