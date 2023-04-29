class Health < ApplicationRecord
  belongs_to :user
  validates :weight, presence: true, numericality: { greater_than_or_equal_to: 40, less_than_or_equal_to: 100 }
  validates :body_fat_percent, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 40 }
  validates :date, presence: true, inclusion: { in: (Date.new(2023, 1, 1)..Date.today) }
end
