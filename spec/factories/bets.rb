FactoryBot.define do
  factory :bet, class: 'Bet' do
    association :user
    association :game 
    market 'ft'
    price_cents 1000
    odds 1.5
  end

  factory :settled_bet, class: 'Bet' do
    association :user
    association :game 
    market 'ft'
    price_cents 1000
    odds 1.5
    won true
  end

  factory :unsettled_bet, class: 'Bet' do
    association :user
    association :game 
    market 'ft'
    price_cents 1000
    odds 1.5
    won nil
  end
end
