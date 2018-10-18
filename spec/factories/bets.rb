FactoryBot.define do
  factory :bet do
    association :user
    association :game 
    market 'ft'
    price_cents 1000
  end
end
