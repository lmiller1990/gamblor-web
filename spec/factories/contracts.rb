FactoryBot.define do
  factory :contract do
    association :team, factory: :red_side_team 
    start 1.year.ago
    player

    trait :no_end_date do end_date nil end

    trait :future_end_date do end_date 1.year.from_now end

    trait :past_date do end_date 1.year.ago end
  end
end
