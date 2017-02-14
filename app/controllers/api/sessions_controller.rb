class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    if @user
      login!(@user)

      render "api/users/show"
    else
      render json: ["Invalid Credentials"], status: 422
    end
  end

  def destroy
    # Likely that this will never occur, but implement for safe measure
    unless logged_in?
      render json: ["No current user to log out"], status: 404
    end

    logout!

    # return empty object to indicate no user
    render json: {}
  end
end
