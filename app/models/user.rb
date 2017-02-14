class User < ActiveRecord::Base
  after_initialize :ensure_session_token
  # Though very low, eliminate the possibility of duplicate session_token
  before_validation :ensure_session_token_uniqueness

  validates :email, :username, :name, :password_digest,
    :session_token, presence: true
  validates :email, :username, :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  def self.find_by_credentials(email, password)
    user = User.find_by_email(email)
    user.try(:is_password?, password) ? user : nil
  end

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
    while User.find_by_session_token(self.session_token)
      self.session_token = generate_session_token
    end
  end
end
