# == Schema Information
#
# Table name: likes
#
#  id         :integer          not null, primary key
#  story_id   :integer          not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Like < ActiveRecord::Base
  validates :user, :story, presence: true
  validates :user, uniquenss: { scope: :story }

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
