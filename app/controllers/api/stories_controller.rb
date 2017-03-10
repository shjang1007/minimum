class Api::StoriesController < ApplicationController
  def index
    stories = Story.all
    # Include to make query faster
    @stories = stories.includes(:author, :liked_users, :tags)
    render :index
  end

  def nba
    stories = Tag.includes(:stories).where(name: "nba").first.stories
    @stories = stories.includes(:author, :liked_users, :tags)
    render :index
  end

  def show
    @story = Story.includes(:author, :tags).find(params[:id])
    render :show
  end

  def comments
    @comments = Story.includes(:author, :liked_users)
                .where("id = #{params[:id]} or parent_id = #{params[:id]}")

    render :comments
  end

  def create
    @story = Story.new(story_params)
    # If I have this, when it's created first, I can set the date in, but
    # I won't be able to do set it to when I actually want to publish
    # @story.published_at = Date.today.strftime("%b %-d")

    if @story.save
      render :show
    else
      render json: @story.errors.full_messages, status: 422
    end
  end

  def update
    @story = Story.find(params[:id])

    if @story.update(story_params)
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
        :author_id,
        :image,
        tag_names: []
      )
  end
end
