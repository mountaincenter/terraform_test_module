FactoryBot.define do
  factory :health do
    weight { 1.5 }
    body_fat_percent { 1.5 }
    date { "2023-04-23" }
    memo { "MyString" }
    user { nil }
  end
end
