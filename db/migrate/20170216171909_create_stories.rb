class CreateStories < ActiveRecord::Migration
  def change
    create_table :stories do |t|
      t.string :title, null: false
      t.string :sub_title
      t.text :content, null: false
      t.integer :author_id, null: false
      t.boolean :published, default: false
      t.date :published_at

      t.timestamps null: false
    end

    add_index :stories, :author_id
  end
end
