class ChangeStoriesForeignKey < ActiveRecord::Migration
  def change
    remove_column :stories, :author
    add_column :stories, :author_id, :integer
    add_index :stories, :author_id
  end
end
