class Api::SearchesController < ApplicationController
  def index
    stories = []
    users = []

    term = params[:search_term]

    PgSearch.multisearch(term).each do |record|
      item = record.searchable
      record.searchable_type == "Story" ? stories << item : users << item
    end

    @stories = stories
    @users = users
    render :index
  end
end
