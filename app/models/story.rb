# == Schema Information
#
# Table name: stories
#
#  id           :integer          not null, primary key
#  title        :string           not null
#  sub_title    :string
#  content      :text             not null
#  published    :boolean          default("false")
#  published_at :date
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  parent_id    :integer
#  author       :string
#

class Story < ActiveRecord::Base
  validates :title, :content, :author, presence: true
  validates :title, uniqueness: { scope: :author, message: "Already exist" }

  belongs_to(
    :author,
    class_name: "User",
    foreign_key: :author_id,
    primary_key: :id
  )

  belongs_to(
    :story,
    class_name: "Story",
    foreign_key: :parent_id,
    primary_key: :id
  )

  has_many(
    :comments,
    class_name: "Story",
    foreign_key: :parent_id,
    primary_key: :id
  )
end
