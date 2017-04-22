class Api::SearchesController < ApplicationController
  def index
    if !params[:search_term]
      stories = []
      users = []
    else
      term = params[:search_term].downcase
      stories = Story
        .where("lower(title) like ? or lower(sub_title) like ? or lower(content) like ?",
                "%#{term}%", "%#{term}%", "%#{term}%")
        .where(published: true)
        .includes(:author, :liked_users, :tags)
      users = User
        .where("lower(name) like ? or lower(username) like ? or lower(description) like ?",
                "%#{term}%", "%#{term}%", "%#{term}%")
    end

    @stories = stories
    @users = users
    render :index
  end
end
