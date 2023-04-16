class MessageSerializer < ActiveModel::Serializer
  attributes :id, :body, :sender_id, :recipient_id, :sender ,:created_at
  belongs_to :sender, only: [:name]
  belongs_to :recipient, only: [:id, :name => :recipient_name]

  def sender
    {
      name: object.sender.name,
    }
  end

  def recipient
    {
      name: object.recipient.name,
    }
  end
end
