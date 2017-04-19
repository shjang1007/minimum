class Api::StoriesController < ApplicationController
  def index
    if params[:tag_name]
      stories = Tag.find_stories_by_tag_name(params[:tag_name])
    else
      stories = Story.where(published: true, parent_id: nil)
    end
    # Include to make query faster
    @stories = stories.includes(:author, :liked_users, :tags)
    render :index
  end

  def search
    if params[:search_term].empty?
      stories = []
    else
      term = params[:search_term].downcase
      stories = Story
        .where("lower(title) like ? or lower(sub_title) like ? or lower(content) like ?",
                "%#{term}%", "%#{term}%", "%#{term}%")
        .where(published: true)
        .includes(:author, :liked_users, :tags)
    end

    @stories = stories
    render :index
  end

  def top
    stories = Story.where({published: true, parent_id: nil})
                    .includes(:author, :tags, :likes)
                    .sort_by { |story| story.likes.count }
                    .reverse
    @stories = stories[0..9]
    render :index
  end

  def brian
    brian_id = User.find_by(username: "BekGu").id
    stories = Story.where({published: true, parent_id: nil, author_id: brian_id})
                    .includes(:author, :tags)
                    .sort_by { |story| story.id }
                    .reverse

    @stories = stories[0..9]
    render :index
  end

  def show
    @story = Story.includes(:author, :tags, :liked_users).find(params[:id])
    render :show
  end

  def comments
    @comments = Story.includes(:author, :liked_users)
                .where("id = #{params[:id]} or parent_id = #{params[:id]}")

    render :comments
  end

  def create
    @story = Story.new(story_params)

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
