class AddIndexToStories < ActiveRecord::Migration
  def change
    add_index :stories, :author
    add_index :stories, :parent_id
  end
end
