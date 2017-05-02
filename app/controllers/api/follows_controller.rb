class Api::FollowsController < ApplicationController
  def create
    follow = Follow.new(follow_params)
    if follow.save
      @user = follow.followee

      render "/api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def destroy
    follow = follow.find_by(
      follower_id: params[:follow][:follower_id],
      followee_id: params[:follow][:followee_id]
    )

    @user = follow.followee

    follow.destroy

    render "/api/users/show"
  end

  def follow_params
    params.require(:follow).permit(:follower_id, :followee_id)
  end
end
