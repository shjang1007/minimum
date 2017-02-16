json.extract! story, :id, :title, :sub_title, :content, :published, :published_at

json.set! :author do
  json.partial! "api/users/user", user: story.author
end

if story.parent_id
  json.set! :parent_story do
    json.extract! story.parent_story, :id, :title, :sub_title, :content, :published, :published_at
  end
end

if story.comments
  json.set! :comments do
    story.comments.each do |comment|
      json.set! comment.id do
        json.partial! "api/stories/story", story: comment
      end
    end
  end
end
