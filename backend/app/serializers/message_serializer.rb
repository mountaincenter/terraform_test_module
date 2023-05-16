class MessageSerializer < ActiveModel::Serializer
  attributes :id, :body, :sender_id, :recipient_id, :sender, :recipient ,:created_at

  def sender
    {
      id: object.sender.id,
      name: object.sender.name,
    }
  end

  def recipient
    {
      id: object.recipient.id,
      name: object.recipient.name,
    }
  end
end
