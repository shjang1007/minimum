# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

## JSON API

### Users

- `POST /api/users`
- `PATCH /api/users`

### Session

- `POST /api/session`
- `DELETE /api/session`

### Stories

- `GET /api/stories`
- `POST /api/stories`
- `GET /api/stories/:id`
- `PATCH /api/stories/:id`
- `DELETE /api/stories/:id`

### Comments

- `GET /api/stories/:story_id/comments`
- `POST /api/stories/:story_id/comments`
- `GET /api/stories/:story_id/comments/:id`
- `PATCH /api/comments/:id`
- `DELETE /api/comments/:id`


### Follows

- `GET /api/follows`
- `POST /api/follows`
- `DELETE /api/follows/:id`

### Likes

- `GET /api/likes`
- `POST /api/likes`
- `DELETE /api/likes/:id`
