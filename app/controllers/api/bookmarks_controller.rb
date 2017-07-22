class Api::BookmarksController < ApplicationController
  def create
    bookmark = Bookmark.new(like_params)
    if bookmark.save!
      @story = bookmark.story
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
    bookmark = Bookmark.find_by(
      user_id: params[:bookmark][:user_id],
      story_id: params[:bookmark][:story_id]
    )

    @story = bookmark.story
    @comments = Story.where("parent_id = #{@story.id}")
                      .where(published: true)
                      .includes(:author, :tags, :liked_users)
                      .sort { |a, b| b.id <=> a.id }
    bookmark.destroy

    render "/api/stories/show"
  end

  def like_params
    params.require(:bookmark).permit(:story_id, :user_id)
  end
end
