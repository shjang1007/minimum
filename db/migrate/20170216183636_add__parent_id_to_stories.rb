class AddParentIdToStories < ActiveRecord::Migration
  def change
    add_column :stories, :parent_id, :integer
    add_column :stories, :author, :string
    remove_column :stories, :author_id
  end
end
