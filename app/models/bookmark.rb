class Bookmark < ActiveRecord::Base
  validates :user, :story, presence: true
  validates :user, uniqueness: { scope: :story }

  belongs_to(
    :user,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id
  )

  belongs_to(
    :story,
    class_name: "Story",
    foreign_key: :story_id,
    primary_key: :id
  )
end
