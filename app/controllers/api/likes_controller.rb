class LikesController < ApplicationController
  def create
    @like = Like.new(like_params)

    if @like.save
      render json: ["saved"]
    else
      render json: @story.errors.full_messages, status: 422
    end
  end

  def destroy
    @like = Like.find(params[:id])
    @like.destroy
  end

  def like_params
    params.require(:like).permit(:story_id, :user_id)
  end
end
