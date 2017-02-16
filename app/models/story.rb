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
end
