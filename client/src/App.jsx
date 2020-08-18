import React, { useReducer, useState, useEffect, createContext } from 'react';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom'

import reducer from './api/auth/reducer';
import Auth from './api/auth/auth';
import Page from './api/pages/pages';

import CVBuilder from './views/CVBuilder/CVBuilder';
import Signup from './views/Signup/Signup';
import Signin from './views/Signin/Signin';
import UserPages from './views/UserPages/UserPages';

import Topbar from './ui/Topbar/Topbar';
import Modal from './ui/Modal/Modal';

export const AppContext = createContext();

const App = _ => {
	const jwt = localStorage.getItem('jwt_token');
	const [state, dispatch] = useReducer(reducer, { data: undefined, error: null, loading: true });
	const [modalOpen, setModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState();
	const [newPageAdded, setNewPageAdded] = useState(false);

	useEffect(() => {
		getJwt();
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	async function getJwt() {
		const res = await Auth.authenticate(jwt);
		dispatch(res);
	}

	return (
		<AppContext.Provider value={{
			jwt,
			Page, Auth,
			state, dispatch,
			modalOpen, setModalOpen,
			newPageAdded, setNewPageAdded,
			setModalContent
		}}>
			<BrowserRouter>
				<Topbar />
				<Switch>
					<Route path="/signup" component={Signup} />
					<Route path="/signin" component={withRouter(Signin)} />
					<Route path="/pages" component={UserPages} />
					<Route path="/" component={CVBuilder} exact />
				</Switch>
			</BrowserRouter>
			<Modal
				isVisible={modalOpen}
				backdropClicked={_ => setModalOpen(false)}>
				{modalContent}
			</Modal>
		</AppContext.Provider>
	);
}
 
export default App;