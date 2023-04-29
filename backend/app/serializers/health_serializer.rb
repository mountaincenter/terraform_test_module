class HealthSerializer < ActiveModel::Serializer
  attributes :id, :weight, :body_fat_percent, :date
  belongs_to :user

  def user
    {
      id: object.user.id,
      name: object.user.name,
      height: object.user.height,
      target_weight: object.user.target_weight,
    }
  end
end
