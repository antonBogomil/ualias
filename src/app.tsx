import React, {Suspense, useEffect} from 'react';
import {Provider} from 'mobx-react'
import store from "./store";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Playing from "./pages/playing";
import PageInit from "./pages";
import TeamsTable from "./pages/table";

const Teams = React.lazy(() => import('./pages/teams'));
window['store'] = store

const App = () => {
  return (
	<Provider store={store}>
	  <BrowserRouter>
		<Suspense fallback={'loadng...'}>
		  <PageInit store={store}>
			<Switch>
			  <Route exact path={'/'} component={() => (<div>Home</div>)}/>
			  <Route path={'/teams'} component={Teams}/>
			  <Route path={'/table'} component={TeamsTable}/>
			  <Route path={'/playing'} component={Playing}/>
			</Switch>
		  </PageInit>
		</Suspense>
	  </BrowserRouter>
	</Provider>
  );
};

export default App;


