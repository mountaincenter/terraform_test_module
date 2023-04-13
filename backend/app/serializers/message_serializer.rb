class MessageSerializer < ActiveModel::Serializer
  attributes :id, :body, :sender_id, :recipient_id, :created_at
  belongs_to :sender, only: [:id]
  belongs_to :recipient, only: [:id, :name => :recipient_name]

end
