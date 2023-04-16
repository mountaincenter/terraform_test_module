FactoryBot.define do
  factory :message do
    sender { nil }
    recipient { nil }
    body { "MyString" }
  end
end
