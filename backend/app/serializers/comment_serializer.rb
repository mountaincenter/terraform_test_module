class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body, :user_id, :post_id, :created_at
  belongs_to :user, only: [:id, :name]

  def user
    {
      id: object.user.id,
      name: object.user.name,
    }
  end
end
