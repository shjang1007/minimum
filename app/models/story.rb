# == Schema Information
#
# Table name: stories
#
#  id                 :integer          not null, primary key
#  title              :string
#  sub_title          :string
#  content            :text
#  published          :boolean          default("false")
#  published_at       :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  parent_id          :integer
#  author_id          :integer
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
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

  has_many(
    :likes,
    class_name: "Like",
    foreign_key: :story_id,
    primary_key: :id
  )

  has_many(
   :liked_users,
   through: :likes
  )

end
