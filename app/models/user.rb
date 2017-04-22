# == Schema Information
#
# Table name: users
#
#  id                  :integer          not null, primary key
#  email               :string           not null
#  password_digest     :string           not null
#  username            :string           not null
#  name                :string           not null
#  session_token       :string           not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  avatar_file_name    :string
#  avatar_content_type :string
#  avatar_file_size    :integer
#  avatar_updated_at   :datetime
#

class User < ActiveRecord::Base
  after_initialize :ensure_session_token
  # Though very low, eliminate the possibility of duplicate session_token
  before_validation :ensure_session_token_uniqueness

  validates :email, :username, :name, :password_digest,
    :session_token, presence: true
  validates :email, :username, :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  # PG Search to handle searching function
  include PgSearch
  multisearchable against: [:username, :name, :description]

  has_attached_file :avatar,
    default_url: "profile-avatar.png",
    styles: { default: "100x100#" }
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\z/

  def self.find_by_credentials(email, password)
    user = User.find_by_email(email)
    user.try(:valid_password?, password) ? user : nil
  end

  has_many(
    :stories,
    class_name: "Story",
    foreign_key: :author_id,
    primary_key: :id
  )

  has_many(
    :likes,
    class_name: "Like",
    foreign_key: :user_id,
    primary_key: :id
  )

  has_many(
   :liked_stories,
   through: :likes,
   source: :story
  )

  attr_reader :password

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
    self.session_token = generate_session_token
    self.save

    self.session_token
  end

  def valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  private

  def ensure_session_token
    self.session_token ||= generate_session_token
  end

  def generate_session_token
    SecureRandom.urlsafe_base64(16)
  end

  def ensure_session_token_uniqueness
    while !User.find_by_password_digest(self.password_digest) &&
          User.find_by_session_token(self.session_token)
      self.session_token = generate_session_token
    end
  end
end
