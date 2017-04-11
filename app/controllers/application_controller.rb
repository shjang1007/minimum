class ApplicationController < ActionController::Base
  # what to do with this?
  protect_from_forgery with: :exception

  helper_method :current_user, :signed_in?

  def current_user
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def signed_in?
    !!current_user
  end

  def signin!(user)
    @current_user = user
    session[:session_token] = user.reset_session_token!
  end

  def signout!
    current_user.try(:reset_session_token!)
    session[:session_token] = nil
  end
end
