import React from "react";
import { Provider } from "react-redux";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import App from "./app";
import HomeContainer from "./home/home_container";
import SignInForm from "./session/sign_in_form";
import SignUpForm from "./session/sign_up_form";

const Root = ({ store }) => {
  return (
    <Provider store={ store }>
      <Router history={ hashHistory }>
        <Route path="/" component={ App }>
          <IndexRoute component={HomeContainer} />
          <Route path="/signIn" component={SignInForm} />
          <Route path="/signUp" component={SignUpForm} />
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
