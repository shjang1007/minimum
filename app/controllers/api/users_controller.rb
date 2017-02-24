class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      signin!(@user)

      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    @user = User.find_by_username(params[:username])

    if @user
      render :show
    else
      render json: ["No Show"], status: 404
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :username, :name)
  end
end
