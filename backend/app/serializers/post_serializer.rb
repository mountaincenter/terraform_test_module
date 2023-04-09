# frozen_string_literal: true

#
# Post Serializer
#
class PostSerializer < ActiveModel::Serializer
  attributes :id, :content, :images, :is_liked, :created_at
  belongs_to :user
  has_many :likes

  def is_liked
    if scope.present?
      object.likes.where(user_id: scope.id).exists?
    else
      false
    end
  end

  def likes
    object.likes.count
  end

end
