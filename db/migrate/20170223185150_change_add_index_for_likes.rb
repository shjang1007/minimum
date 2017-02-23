class ChangeAddIndexForLikes < ActiveRecord::Migration
  def change
    add_index :likes, [ :story_id, :user_id ], unique: true
  end
end
