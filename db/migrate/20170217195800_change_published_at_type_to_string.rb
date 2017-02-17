class ChangePublishedAtTypeToString < ActiveRecord::Migration
  def change
    change_column :stories, :published_at, :string
  end
end
