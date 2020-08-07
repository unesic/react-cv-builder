import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import CVBuilder from './views/CVBuilder/CVBuilder';
import Signup from './views/Signup/Signup';
import Signin from './views/Signin/Signin';

const App = _ => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/signup" component={Signup} />
				<Route path="/signin" component={Signin} />
				<Route path="/" component={CVBuilder} exact />
			</Switch>
		</BrowserRouter>
	);
}
 
export default App;