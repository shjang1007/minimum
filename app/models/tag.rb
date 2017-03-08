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
  validates :name, inclusion: { in: [ "basketball", "league of legends" ] }

  # Probably don't need this, since I will never call stories from tag
  has_many :taggings
  has_many :stories, through: :taggings
end
