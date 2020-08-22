import React, { useReducer, useState, useEffect, createContext } from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import reducer from "./api/auth/reducer";
import Auth from "./api/auth/auth";
import Page from "./api/pages/pages";

import PageBuilder from "./views/SinglePage/PageBuilder/PageBuilder";
import Signup from "./views/Signup/Signup";
import Signin from "./views/Signin/Signin";
import UserPages from "./views/UserPages/UserPages";
import SinglePage from "./views/SinglePage/SinglePage";

import Topbar from "./ui/Topbar/Topbar";
import Modal from "./ui/Modal/Modal";

export const AppContext = createContext();

const App = (props) => {
	const jwt = localStorage.getItem("jwt_token");
	const [state, dispatch] = useReducer(reducer, {
		data: undefined,
		error: null,
		loading: true,
	});
	const [modalOpen, setModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState();
	const [newPageAdded, setNewPageAdded] = useState(false);
	const [isAppMounted, setIsAppMounted] = useState(false);
	const [pageMode, setPageMode] = useState("");
	const [pageData, setPageData] = useState();

	useEffect(() => {
		getJwt();
		setIsAppMounted(true);
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	async function getJwt() {
		const res = await Auth.authenticate(jwt);

		// if (res.type !== "AUTH_ERROR") {
		dispatch(res);
		// }
	}

	return (
		<AppContext.Provider
			value={{
				jwt,
				isAppMounted,
				Page,
				Auth,
				state,
				dispatch,
				modalOpen,
				setModalOpen,
				newPageAdded,
				setNewPageAdded,
				setModalContent,
				pageMode,
				setPageMode,
				pageData,
				setPageData,
			}}
		>
			{!props.location.search.includes("&edit=1") && <Topbar />}
			<Switch>
				<Route path="/signup" component={withRouter(Signup)} />
				<Route path="/signin" component={withRouter(Signin)} />
				<Route path="/pages" component={withRouter(UserPages)} />
				<Route path="/:username/:slug" component={SinglePage} />
				<Route path="/" component={PageBuilder} exact />
			</Switch>

			<Modal
				isVisible={modalOpen}
				backdropClicked={() => setModalOpen(false)}
			>
				{modalContent}
			</Modal>
		</AppContext.Provider>
	);
};

export default withRouter(App);
