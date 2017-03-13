@stories.each do |story|
  json.set! story.id do
    json.extract! story, :id, :title, :tags

    json.author do
      json.partial! "api/users/user", user: story.author
    end
  end
end
