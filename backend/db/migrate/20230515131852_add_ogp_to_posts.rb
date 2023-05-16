class AddOgpToPosts < ActiveRecord::Migration[7.0]
  def change
    add_column :posts, :ogp_title, :string
    add_column :posts, :ogp_url, :string
    add_column :posts, :ogp_image, :string
    add_column :posts, :ogp_description, :text
  end
end
