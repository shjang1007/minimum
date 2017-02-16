class Api::StoriesController < ApplicationController
  def index
    stories = Story.all
    # Include to make query faster
    @stories = stories.includes(:author, :comments, :story)
    render :index
  end

  def show
    @story = Story.find(params[:id])

    render :show
  end

  def create
    @story = Story.new(story_params)
    @story.published_at = Date.now

    if @story.save
      render :show
    else
      render json: @story.errors.full_messages, status: 422
    end
  end

  def update
    @story = Story.find(params[:id])

    if @story.update(sotry_params)
      render :show
    else
      # Maybe different error rendering required?
      render json: @story.errors.full_messages, status: 422
    end
  end

  def destroy
    @story = Story.find(params[:id])

    unless @story
      render json: ["Requested story does not exist"], status: 404
    end

    @story.destroy
    render :show
  end

  private

  def story_params
    params
      .require(:story)
      .permit(
        :title,
        :sub_title,
        :content,
        :published,
        :published_at,
        :parent_id,
        :author
      )
  end
end
