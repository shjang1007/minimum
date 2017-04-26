json.extract! user, :id, :email, :username, :name, :description
json.avatar_url asset_path(user.avatar.url(:default))

stories = []
drafts = []

user.stories.each do |story|
  if story.published
    stories << story
  else
    drafts << story
  end
end

json.stories do
  json.array! stories.reverse do |story|
    json.extract! story, :id, :title, :sub_title, :content, :parent_id, :published, :published_at
    if story.image.file?
      json.image_url asset_path(story.image.url(:medium))
    end

    json.liked_users do
      json.array! story.liked_users do |user|
        json.extract! user, :id, :name
      end
    end
  end
end

json.drafts do
  json.array! drafts.reverse do |story|
    json.extract! story, :id, :title, :sub_title, :content, :parent_id, :published, :published_at
    if story.image.file?
      json.image_url asset_path(story.image.url(:medium))
    end

    json.liked_users do
      json.array! story.liked_users do |user|
        json.extract! user, :id, :name
      end
    end
  end
end

json.liked_stories do
  user.liked_stories.each do |story|
    json.set! story.id do
      json.extract! story, :id, :title, :sub_title, :published_at
    end
  end
end
