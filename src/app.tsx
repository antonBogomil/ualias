import React, {Suspense} from 'react';
import {Provider} from 'mobx-react'
import store from "./store";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Playing from "./pages/playing";
import PageInit from "./pages";
import TeamsTable from "./pages/table";
import {paths} from "./constants";
import Header from "./components/header";

const Teams = React.lazy(() => import('./pages/teams'));
window['store'] = store

const App = () => {
  return (
	<Provider store={store}>
	  <Header/>
	  <BrowserRouter>
		<Suspense fallback={'loading...'}>
		  <PageInit store={store}>
			<Switch>
			  <Route exact path={'/'} component={() => (<div>Home</div>)}/>
			  <Route path={paths.TEAMS} component={Teams}/>
			  <Route path={paths.TABLE} component={TeamsTable}/>
			  <Route path={paths.PLAY} component={Playing}/>
			  <Route component={() => (<div>404</div>)}/>

			</Switch>
		  </PageInit>
		</Suspense>
	  </BrowserRouter>
	</Provider>
  );
};

export default App;


