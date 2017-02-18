import React from "react";
import { Provider } from "react-redux";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import App from "./app";
import Home from "./home/home";
import StoryIndex from "./story/story_index";
import StoryForm from "./story/story_form";

const Root = ({ store }) => {
  return (
    <Provider store={ store }>
      <Router history={ hashHistory }>
        <Route path="/" component={ App }>
          <IndexRoute component={ Home } />
          <Route path="/new-story" component={ StoryForm } />
          <Route path="/:storyId/edit-story" component={ StoryForm } />
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
