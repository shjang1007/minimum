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

  def update
    @user = User.find_by_username(params[:username])
    if @user.update(user_params)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def stories
    user = User.includes(:stories).find_by_username(params[:username])
    @stories = user.stories.where(published: true).where(parent_id: nil)
    render "api/stories/index"
  end

  private

  def user_params
    params
      .require(:user)
      .permit(:email, :password, :username, :avatar, :name, :description)
  end
end
