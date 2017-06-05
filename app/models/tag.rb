# == Schema Information
#
# Table name: tags
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Tag < ActiveRecord::Base
  validates :name, presence: true
  validates :name, inclusion: {
    in: ["nba", "lol", "food", "travel", "cartoon"]
  }

  def self.find_stories_by_tag_name(tag_name)
    self.includes(:stories)
        .where(name: tag_name)
        .first
        .stories
        .order(id: :desc)
  end

  def self.find_three_stories_by_tag_name(tag_name)
    self.includes(:stories).where(name: tag_name).first.stories
      .order(id: :desc)
      .where(published: true)
      .limit(3)
  end

  has_many :taggings
  has_many :stories, through: :taggings
end
