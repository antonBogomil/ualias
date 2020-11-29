import React from 'react';
import Teams from "./pages/teams";
import {Provider} from 'mobx-react'
import store from "./store";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Playing from "./pages/playing";

const App = () => {
  return (
	<Provider store={store}>
	  <BrowserRouter>
		<Switch>
		  <Route exact path={'/'} component={() => (<div>Home</div>)}/>
		  <Route path={'/teams'} component={Teams}/>
		  <Route path={'/playing'} component={Playing}/>
		</Switch>
	  </BrowserRouter>
	</Provider>
  );
};

export default App;
