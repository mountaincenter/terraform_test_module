# frozen_string_literal: true

#
# User Serializer
#
class UserSerializer < ActiveModel::Serializer
  attributes :id, :name,:profile, :email, :followingsCount, :followersCount, :followed?, :uid, :provider, :image
  belongs_to :posts

  def followingsCount
    object.following.count
  end

  def followersCount
    object.followers.count
  end


  def followed?
    if scope.present?
      object.followers.where(id: scope.id).exists?
    else
      false
    end
  end
end
