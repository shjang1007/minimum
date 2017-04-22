json.stories do
  json.array! @stories do |story|
    json.partial! "api/stories/story", story: story
  end
end

json.users do
  json.array! @users do |user|
    json.partial! "api/users/user", user: user
  end
end
