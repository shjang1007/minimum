json.extract! user, :id, :email, :username, :name
json.avatar_url asset_path(user.avatar.url(:default))

if user.stories
  json.set! :stories do
    user.stories.each do |story|
      json.set! story.id do
        json.extract! story, :id, :title, :sub_title, :content, :parent_id, :published, :published_at
        if story.image.file?
          json.image_url asset_path(story.image.url(:medium))
        end
        json.liked_users do
          story.liked_users.each do |user|
            json.set! user.id do
              json.extract! user, :id, :name
            end
          end
        end
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
