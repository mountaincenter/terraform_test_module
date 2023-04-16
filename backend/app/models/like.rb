# frozen_string_literal: true

#
# Like Serializer
#
class Like < ApplicationRecord
  belongs_to :user
  belongs_to :post
end
