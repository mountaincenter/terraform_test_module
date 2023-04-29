class CreateHealths < ActiveRecord::Migration[7.0]
  def change
    create_table :healths do |t|
      t.float :weight, null:false, scale: 2
      t.float :body_fat_percent,  scale: 2
      t.date :date, null: false
      t.string :memo
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
