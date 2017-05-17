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

stories.sort! { |a, b| b.id <=> a.id }
drafts.sort! { |a, b| b.id <=> a.id }

json.stories do
  json.array! stories do |story|
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
  json.array! drafts do |story|
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


followers = []
followees = []

user.followers.each { |follower| followers << follower.follower_id }
user.followees.each { |followee| followees << followee.followee_id }

json.followers do
  json.array! followers
end

json.followees do
  json.array! followees
end
