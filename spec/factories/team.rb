FactoryBot.define do
  factory :team, class: Team do
    name do 'clg' end
  end

  factory :red_side_team, class: Team do
    id do 1 end
    name do 'red team' end
  end

  factory :blue_side_team, class: Team do
    id do 2 end
    name do 'blue team' end
  end
end
