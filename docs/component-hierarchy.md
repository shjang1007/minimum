## Component Hierarchy

**HomeContainer**
 - Home
  - StoriesContainer

**AuthFormContainer**
 - AuthForm

**StoriesContainer**
 - Stories

**StoryContainer**
 - Story
  - CommentsContainer
  - CommentsForm

**CommentsContainer**
 - Comments

**NewStoryContainer**
 - NewStory
  - StoryForm

**NewCommentContainer**
  -CommentForm

**UserPageContainer**
 - UserPage
  - UserStoriesContainer

**UserStoriesContainer**
 - UserStories

## Routes

|Path   | Component   |
|-------|-------------|
| "/" | "HomeContainer" |
| "/signUp" | "AuthFormContainer" |
| "/signIn" | "AuthFormContainer" |
| "/stories" | "StoriesContainer" |
| "/stories/storyId" | "StoryContainer" |
| "/new-story" | "NewStoryContainer" |
| "/user/:userId" | "UserPageContainer" |
| "/user/:userId/public" | "UserStoriesContainer" |
| "/user/:userId/draft" | "UserStoriesContainer" |
