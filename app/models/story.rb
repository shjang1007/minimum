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

class Story < ActiveRecord::Base
  validates :author, presence: true
  validates :published, inclusion: { in: [ true, false ] }

  # PG Search to handle searching function
  include PgSearch
  multisearchable against: [:title, :sub_title, :content],
                  if: lambda { |story| story.published }

  has_attached_file :image,
    default_url: "no_image",
    styles: { medium: "740"}

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
   through: :likes,
   source: :user
  )

  has_many :taggings
  has_many :tags, through: :taggings, source: :tag

  def tag_names=(tag_names)
    self.tags = tag_names.map do |tag_name|
      Tag.find_or_create_by(name: tag_name)
    end
  end
end
