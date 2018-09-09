FactoryBot.define do
  factory :contract do
    association :team, factory: :red_side_team 
    start 1.year.ago
    player

    trait :no_end_date { end_date nil }

    trait :future_end_date { end_date 1.year.from_now }

    trait :past_date { end_date 1.year.ago }
  end
end
