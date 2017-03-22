import React from "react";
import { Provider } from "react-redux";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import App from "./app";
import HomePage from "./pages/home_page";
import TagPage from "./pages/tag_page";
import TopStoryPage from "./pages/top_story_page";
import BrianStoryPage from "./pages/brian_story_page";
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
    const storyIds = Object.keys(store.getState().stories);
    const lastStoryId = storyIds[storyIds.length - 1];
    const currentStory = store.getState().stories[lastStoryId];
    
    if (!currentUser || currentUser.id !== currentStory.author.id) {
      replace('/');
    }
  };

  return (
    <Provider store={ store }>
      <Router history={ hashHistory }>
        <Route path="/" component={ App }>
          <IndexRoute component={ HomePage } />
          <Route path="/top-stories" component={ TopStoryPage } />
          <Route path="/brian-stories" component={ BrianStoryPage } />
          <Route path="/tags/nba" component={ TagPage } />
          <Route path="/tags/lol" component={ TagPage } />
          <Route path="/tags/food" component={ TagPage } />
          <Route path="/tags/travel" component={ TagPage } />
          <Route path="/tags/cartoon" component={ TagPage } />
          <Route path="/new-story"
              component={ StoryForm }
              onEnter={ _ensureLoggedIn }/>
          <Route path="/:storyId/edit-story"
              component={ StoryForm }
              onEnter={ _ensureSameAuthor }/>
          <Route path="/stories/:storyId" component={ StoryShow } />
          <Route path="/@:username" component={ UserShow } />
          <Route path="/me/stories/public" component={ MyStories }
                onEnter={ _ensureLoggedIn }/>
          <Route path="/me/stories/drafts" component={ MyStories }
                  onEnter={ _ensureLoggedIn }/>
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
