json.partial! "api/stories/story", story: @story

json.comments do
  json.array! @comments do |comment|
    json.partial! "api/stories/story", story: comment
  end
end
