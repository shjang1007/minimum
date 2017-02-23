json.extract! user, :id, :email, :username, :name
json.avatar_url asset_path(user.avatar.url(:default))

if user.stories
  json.set! :stories do
    user.stories.each do |story|
      json.set! story.id do
        json.extract! story, :id, :title, :sub_title, :content, :published, :published_at
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
