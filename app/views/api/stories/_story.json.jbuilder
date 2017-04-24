json.extract! story, :id, :title, :sub_title, :content, :published,
  :published_at, :parent_id, :tags

json.author do
  json.partial! "api/users/user", user: story.author
end

# I need this to display parent story on comments
if story.parent_id
  json.set! :parent_story do
    json.extract! story.parent_story, :id, :title, :author
  end
end

json.likes story.likes.length

json.liked_users do
  story.liked_users.each do |user|
    json.set! user.id do
      json.extract! user, :id, :name
    end
  end
end

if story.image.file?
  json.image_url story.image.url(:medium)
  # json.image_url asset_path(story.image.url(:medium))
end
