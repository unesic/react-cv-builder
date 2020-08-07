import React, { useReducer, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

function reducer(state, action) {
	switch(action.type) {
		case 'USER_LOGIN':
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

const Signin = _ => {
	const [state, dispatch] = useReducer(reducer, { user: null, error: null, loading: true })
	const [user, setUser] = useState({ username: '', password: '' })

	const loginUser = async e => {
		e.preventDefault();

		try {
			const res = await axios.get('/api/v1/user');
	
			dispatch({
				type: 'USER_LOGIN',
				payload: res.data.data
			})
		} catch (err) {
			dispatch({
				type: 'ERROR',
				payload: err.response.data.error
			})
		}
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
							<Form className="p-2" onSubmit={loginUser}>
								<Form.Group controlId="signup_username">
									<Form.Label>Username</Form.Label>
									<Form.Control type="text" placeholder="Enter username" value={user.username} onChange={handleUsername} />
								</Form.Group>

								<Form.Group controlId="signup_password">
									<Form.Label>Password</Form.Label>
									<Form.Control type="password" placeholder="Password" value={user.password} onChange={handlePassword} />
								</Form.Group>
								
								<Button variant="primary" type="submit">Sign In</Button>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
			<pre>{JSON.stringify(state)}</pre>
		</Container>
	);
}
 
export default Signin;