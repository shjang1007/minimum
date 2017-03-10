import React from "react";
import { Provider } from "react-redux";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import App from "./app";
import HomePage from "./pages/home_page";
import NbaPage from "./pages/nba_page";
import StoryForm from "./story/story_form";
import StoryShow from "./story/story_show";
import UserShow from "./user/user_show";
import MyStories from "./user/my_stories";

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
          <IndexRoute component={ HomePage } />
          <Route path="/stories/nba" component={ NbaPage } />
          <Route path="/new-story"
              component={ StoryForm }
              onEnter={ _ensureLoggedIn }/>
          <Route path="/:storyId/edit-story"
              component={ StoryForm }/>
          <Route path="/stories/:storyId" component={ StoryShow } />
          <Route path="/@:username" component={ UserShow } />
          <Route path="/me/stories/public" component={ MyStories } onEnter={ _ensureLoggedIn }/>
          <Route path="/me/stories/drafts" component={ MyStories } onEnter={ _ensureLoggedIn }/>
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
