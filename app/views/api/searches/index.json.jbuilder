json.stories do
  @stories.each do |story|
    json.set! story.id do
      json.partial! "api/stories/story", story: story
    end
  end
end

json.users do
  @users.each do |user|
    json.set! user.id do
      json.partial! "api/users/user", user: user
    end
  end
end
