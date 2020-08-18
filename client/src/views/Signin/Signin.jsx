import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Spinner } from 'react-bootstrap';

import { AppContext } from '../../App';

const Signin = (props) => {
	const [user, setUser] = useState({ email: '', password: '' });
	const [loading, setLoading] = useState(false);
	const context = useContext(AppContext);

	const spinner = <div style={{textAlign: 'center'}}><Spinner animation="border" /></div>;
	const btn = (
		<Button
			variant="primary"
			type="submit">Sign In</Button>
	) 
	const btnLoading = (
		<Button
			variant="primary"
			type="submit"
		>
			<Spinner
				as="span"
				animation="border"
				size="sm"
				role="status"
				aria-hidden="true" /> Loading...
		</Button>
	)

	useEffect(() => {
		if (!context.state.loading && context.state.data) {
			props.history.push('/');
		}

		setLoading(false)
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const loginUser = async e => {
		e.preventDefault();
		setLoading(true);

		const res = await context.Auth.login(user);
		
		if (res.type !== 'ERROR') {
			localStorage.setItem('jwt_token', res.payload.token);
			context.dispatch(res);
			props.history.push('/');
		} else {
			setLoading(false);
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
					{context.state.loading ? spinner : (
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
									
									{loading ? btnLoading : btn}
								</Form>
							</Card.Body>
						</Card>
					)}
				</Col>
			</Row>
		</Container>
	);
}
 
export default Signin;