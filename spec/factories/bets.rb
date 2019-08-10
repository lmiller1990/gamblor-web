FactoryBot.define do
  factory :bet, class: 'Bet' do
    association :user
    association :game 
    market do 'ft' end
    price_cents do 1000 end
    odds do 1.5 end
  end

  factory :settled_bet, class: 'Bet' do
    association :user
    association :game 
    market do 'ft' end
    price_cents do 1000 end
    odds do 1.5 end
    won do true end
  end

  factory :unsettled_bet, class: 'Bet' do
    association :user
    association :game 
    market do 'ft' end
    price_cents do 1000 end
    odds do 1.5 end
    won do nil end
  end
end
