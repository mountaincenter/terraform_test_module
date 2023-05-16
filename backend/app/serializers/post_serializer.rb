# frozen_string_literal: true

#
# Post Serializer
#
class PostSerializer < ActiveModel::Serializer
  attributes :id, :content, :images, :liked?, :likes_count, :created_at, :ogp_title, :ogp_url, :ogp_image, :ogp_description
  belongs_to :user
  has_many :likes

  def liked?
    if scope.present?
      object.likes.where(user_id: scope.id).exists?
    else
      false
    end
  end

  def likes_count
    object.likes.count
  end
end
