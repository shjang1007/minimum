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
#  author_id    :integer
#

class Story < ActiveRecord::Base
  validates :author, presence: true
  # Maybe I can remove this later?
  # validates :title, uniqueness: { scope: :author, message: "Already exist" }
  validates :published, inclusion: { in: [ true, false ] }

  has_attached_file :image,
    default_url: "no_image",
    styles: { medium: "300x300>", thumb: "100x100>" }

  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

  belongs_to(
    :author,
    class_name: "User",
    foreign_key: :author_id,
    primary_key: :id
  )

  belongs_to(
    :parent_story,
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
