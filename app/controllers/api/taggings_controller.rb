class Api::TaggingsController < ApplicationController
  def create
    tag = Tag.find_or_create_by(name: params[:name])
    tagging = Tagging.new(story_id: params[:story_id], tag_id: tag.id)

    if tagging.save
      @story = tagging.story
      render "/api/stories/show"
    else
      render json: @story.errors.full_messages, status: 422
    end
  end

  def destroy
    tag = Tag.find_by(name: params[:name])
    tagging = Tagging.find_by(story_id: params[:story_id], tag_id: tag.id)
    @story = tagging.story

    tagging.destroy

    render "/api/stories/show"
  end
end
