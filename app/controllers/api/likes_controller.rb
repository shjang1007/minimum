class Api::LikesController < ApplicationController
  def create
    like = Like.new(like_params)
    if like.save!
      @story = like.story
      @comments = Story.where("parent_id = #{@story.id}")
                        .where(published: true)
                        .includes(:author, :tags, :liked_users)
                        .sort { |a, b| b.id <=> a.id }
      render "/api/stories/show"
    else
      render json: @story.errors.full_messages, status: 422
    end
  end

  def destroy
    like = Like.find_by(
      user_id: params[:like][:user_id],
      story_id: params[:like][:story_id]
    )

    @story = like.story
    @comments = Story.where("parent_id = #{@story.id}")
                      .where(published: true)
                      .includes(:author, :tags, :liked_users)
                      .sort { |a, b| b.id <=> a.id }
    like.destroy

    render "/api/stories/show"
  end

  def like_params
    params.require(:like).permit(:story_id, :user_id)
  end
end
