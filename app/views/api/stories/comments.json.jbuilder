@comments.each do |comment|
  json.set! comment.id do
    json.partial! "api/stories/story", story: comment
  end
end
