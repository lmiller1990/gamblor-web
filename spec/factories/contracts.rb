FactoryBot.define do
  factory :contract do
    association :team, factory: :red_side_team 
    start do 1.year.ago end
    player
  end
end
