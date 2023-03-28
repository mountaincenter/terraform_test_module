# frozen_string_literal: true

FactoryBot.define do
  factory :post do
    content { Faker::Lorem.sentence }
    user
  end
end