class CreateLikes < ActiveRecord::Migration
  def change
    create_table :likes do |t|
      t.integer :story_id, null: false
      t.integer :user_id, null: false

      t.timestamps null: false
    end

    add_index :likes, :story_id 
    add_index :likes, :user_id
  end
end
