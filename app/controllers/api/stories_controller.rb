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

    render :show
  end

  def update
    @story = Story.find(params[:id])

    if @story
      
    else
    end
  end

  def destroy
  end

  private

  def story_params
    params.require(:story).permit(
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
