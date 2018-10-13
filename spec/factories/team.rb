FactoryBot.define do
  factory :team, class: Team do
    name 'clg'
  end

  factory :red_side_team, class: Team do
    id 1
    name 'red team'
  end

  factory :blue_side_team, class: Team do
    id 2
    name 'blue team'
  end
end
