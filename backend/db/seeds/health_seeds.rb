unless Health.exists?
  # users = User.all
  # users.each do |user|
  #   Random.rand(0..5).times do
  #     user.healths.create!(
  #       weight: Random.rand(50..90),
  #       body_fat_percent: Random.rand(0..40),
  #       date: Faker::Date.between(from: 1.week.ago, to: Date.today)
  #     )
  #   end
  # end
  user = User.first
  30.times do
    user.healths.create!(
      weight: Random.rand(75..80),
      body_fat_percent: Random.rand(28..30),
      date: Faker::Date.between(from: 1.month.ago, to: Date.today)
    )
  end
end