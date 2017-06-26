# Minimum

"Minimum" is a full-stack web application inspired by "Medium". Minimum is built using Ruby on Rails and React/Redux.

[Minimum Live][minimum]

[minimum]: http://www.minimum-story.us

<img src="./screenshots/home-page.gif" alt="homepage"/>

## Features and Implementation

### Story CRUD

  Story CRUD is the main feature of Minimum. It utilizes RESTful Rails API with JSON response format to handle Story CRUD request from users. Each story is stored in the database with `id`, `title`, `sub_title`, `content`, `published` (a boolean value to check whether the story is published or not), `published_at`, `parent_id` (a foreign key for association to parent story), and `author_id` (also a foreign key for association to the author) columns in `Stories` table. Both `parent_id` and `author_id` are indexed for the performance improvement.

  #### Creating and Updating Stories

  Writing a story is often times not easy. Especially writing a story in one seating is even more difficult. On top of that, forgetting to save your precious works ... Let's not get into that.

  Therefore, Minimum provides users with real time draft creates and updates to help the users focus on writing their cool stories without the fear of losing their work.
  Minimum provides the users with real time draft creates and updates by binding AJAX requests on user inputs, storing the drafts in the database.

  - First, Minimum creates a new draft upon user input:

    Upon user inputs, you will notice that the url changes from `/new-story` to the `/:storyId/edit-story`:

    <img src="./screenshots/new-story.gif" alt="new-story"/>

  - Second, until you publish through publish button at the top nav bar, it will be just saved as a draft:

    <img src="./screenshots/update-story.gif" alt="update-story"/>

#### Publishing and Deleting Stories

  - You can publish your story with tags:

    <img src="./screenshots/publish-story.gif" alt="publish-story"/>

  - You can edit or delete your own story:

    <img src="./screenshots/edit-story.gif" alt="edit-story"/>

### Comments

  In Minimum, everything is a story. Comments are just a story that have parent story associated with `parent_id` foreign key. Therefore, comments share same database as stories.

  - To write comments, you can either choose to write your comments in the comment section, or to get fancy and go full screen mode:

  <img src="./screenshots/comment.gif" alt="comment"/>

### Likes and Tags

  For Likes and Tags, Minimum uses join tables (`likes` for Likes and `taggings` for Tags). Each join table has two foreign keys with `belongs_to` associations. Then the tables that have `has_many` associations to the join table use `has_many :through` associations to create Likes and Tags.

- Like join table with `user_id` and `story_id` foreign keys
```Ruby
class Like < ActiveRecord::Base
  validates :user, :story, presence: true
  validates :user, uniqueness: { scope: :story }

  belongs_to(
    :user,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id
  )

  belongs_to(
    :story,
    class_name: "Story",
    foreign_key: :story_id,
    primary_key: :id
  )
end
```

- With the Like join table, Story can now create `has_many :through` associations to `users`

  ```Ruby
  class Story < ActiveRecord::Base

    has_many(
      :likes,
      class_name: "Like",
      foreign_key: :story_id,
      primary_key: :id
    )

    has_many(
     :liked_users,
     through: :likes,
     source: :user
    )
  end
  ```

- Tag pages:

  <img src="./screenshots/tag-pages.gif" alt="tag-pages"/>

- Toggle likes:

  <img src="./screenshots/toggle-likes.gif" alt="toggle-likes"/>

#### Future Features

- [X] Search
- [ ] Bookmarks
- [ ] Annotations
- [ ] Enrich Text Editing
- [X] Infinite Scroll
