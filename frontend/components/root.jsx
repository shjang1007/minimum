import React from "react";
import { Provider } from "react-redux";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import App from "./app";
import Home from "./home/home";
import StoryIndex from "./story/story_index";
import StoryForm from "./story/story_form";
import StoryShow from "./story/story_show";

const Root = ({ store }) => {

  const _ensureLoggedIn = (nextState, replace) => {
    const currentUser = store.getState().session.currentUser;
      if (!currentUser) {
        replace("/");
      }
  };

  const _ensureSameAuthor = (nextState, replace) => {
    const currentUser = store.getState().session.currentUser;
    if (currentUser.id !== nextState.params.storyId) {
      replace('/');
    }
  };

  return (
    <Provider store={ store }>
      <Router history={ hashHistory }>
        <Route path="/" component={ App }>
          <IndexRoute component={ Home } />
          <Route path="/new-story"
              component={ StoryForm }
              onEnter={ _ensureLoggedIn }/>
          <Route path="/:storyId/edit-story"
              component={ StoryForm }/>
          <Route path="/stories/:storyId" component={ StoryShow } />
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
