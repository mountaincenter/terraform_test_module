# frozen_string_literal: true

#
# User Serializer
#
class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email
  belongs_to :post
end
