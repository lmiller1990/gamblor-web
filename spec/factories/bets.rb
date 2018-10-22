FactoryBot.define do
  factory :bet do
    association :user
    association :game 
    market 'ft'
    price_cents 1000
    odds 1.5
  end
end
