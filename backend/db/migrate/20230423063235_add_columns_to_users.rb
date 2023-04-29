class AddColumnsToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :height, :float, scale: 1, after: :email
    add_column :users, :target_weight, :float, scale: 2, after: :height
  end
end
