import React from "react";
import { Provider } from "react-redux";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import App from "./app";
import HomeContainer from "./home/home_container";
import SessionFormContainer from "./session/session_form_container"

const Root = ({ store }) => {
  return (
    <Provider store={ store }>
      <Router history={ hashHistory }>
        <Route path="/" component={ App }>
          <IndexRoute component={HomeContainer} />
          <Route path="/signin" component={SessionFormContainer} />
          <Route path="/signup" component={SessionFormContainer} />
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
