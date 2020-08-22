import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

import { AppContext } from '../../App';

const Signin = (props) => {
	const [user, setUser] = useState({ email: '', password: '' });
	const context = useContext(AppContext);

	useEffect(() => {
		if (!context.state.loading && context.state.data && !props.location.state) {
			props.history.push('/');
		}
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const loginUser = async e => {
		e.preventDefault();

		const res = await context.Auth.login(user);
		
		if (res.type !== 'ERROR') {
			localStorage.setItem('jwt_token', res.payload.token);
			context.dispatch(res);
			
			const previousLocation = props.location.state;

			if (previousLocation) {
				props.history.push(previousLocation.from);
			} else {
				props.history.push('/');
			}
		}
	}

	const handleEmail = e => {
		setUser({
			...user,
			email: e.target.value
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
									<Form.Label>Email</Form.Label>
									<Form.Control type="email" placeholder="Enter email" value={user.email} onChange={handleEmail} />
								</Form.Group>

								<Form.Group controlId="signup_password">
									<Form.Label>Password</Form.Label>
									<Form.Control type="password" placeholder="Password" value={user.password} onChange={handlePassword} />
								</Form.Group>
								
								<Button
									variant="primary"
									type="submit">Sign In</Button>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}
 
export default Signin;