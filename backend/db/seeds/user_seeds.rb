# frozen_string_literal: true

unless User.exists?
  10.times do |i|
    email = "test#{i + 1}@example.com"
    User.create!(email:, password: "password",
                 uid: email, provider: "email",
                 name: Faker::Name.name,
                 height: Random.rand(160.0..165.0).round(1),
                 target_weight: Random.rand(70.0..80.0).round(1),
                 profile: "test#{i + 1}ユーザーです")
  end
  guest = "guest@example.com"
  User.create!(email: guest,
               password: "password",
               uid: guest,
               provider: "email",
               name: "ゲストユーザー",
               height: 163.8,
               target_weight: 75.0,
               profile: "ゲストユーザーです")
end
