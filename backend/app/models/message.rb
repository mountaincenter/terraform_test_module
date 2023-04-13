class Message < ApplicationRecord
  belongs_to :sender, class_name: "User"
  belongs_to :recipient, class_name: "User"
  validates :body, presence: true

  scope :between_users, ->(user1, user2) { where(sender_id: user1.id, recipient_id: user2.id).or(where(sender_id: user2.id, recipient_id: user1.id)) }
end