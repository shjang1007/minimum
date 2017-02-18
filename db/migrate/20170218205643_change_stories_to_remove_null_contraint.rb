class ChangeStoriesToRemoveNullContraint < ActiveRecord::Migration
  def change
    change_column_null :stories, :title, true
    change_column_null :stories, :content, true
  end
end
