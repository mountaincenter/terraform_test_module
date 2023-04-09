# frozen_string_literal: true

#
# Follow Serializer
#
class FollowSerializer < ActiveModel::Serializer
  attributes :id, :follower_id, :followed_id, :created_at, :updated_at
  belongs_to :follower, serializer: UserSerializer
  belongs_to :followed, serializer: UserSerializer
end
