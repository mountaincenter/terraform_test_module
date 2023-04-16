class AddProfileToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :profile, :string, limit: 160, after: :email
  end
end
