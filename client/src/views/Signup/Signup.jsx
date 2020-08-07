import React, { useReducer, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

function reducer(state, action) {
	switch(action.type) {
		case 'USER_REGISTER':
			return {
				loading: false,
				data: action.payload
			}
		case 'ERROR':
			return {
				error: action.payload
			}
		default:
			return state;
	}
}

const Signup = _ => {
	const [state, dispatch] = useReducer(reducer, { user: null, error: null, loading: true });
	const [user, setUser] = useState({ username: '', email: '', password: '' })

	const registerUser = async e => {
		e.preventDefault();

		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}

		try {
			const res = await axios.post('/api/v1/user', user, config);
	
			dispatch({
				type: 'USER_REGISTER',
				payload: res.data.data
			})
		} catch (err) {
			dispatch({
				type: 'ERROR',
				payload: err.response.data.error
			})
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
								<Form.Group controlId="signup_email">
									<Form.Label>Email address</Form.Label>
									<Form.Control type="email" placeholder="Enter email" value={user.email} onChange={handleEmail} />
								</Form.Group>
								
								<Form.Group controlId="signup_username">
									<Form.Label>Username</Form.Label>
									<Form.Control type="text" placeholder="Enter username" value={user.username} onChange={handleUsername} />
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