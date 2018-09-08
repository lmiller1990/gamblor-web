FactoryBot.define do
  factory :game do
    date DateTime.now
    winner_id 1  
    loser_id 1
    blue_side_team_id 1
    red_side_team_id 2
  end

  trait :with_teams do
    after :create do |game|
      blue_team = create(:blue_side_team)
      red_team = create(:red_side_team)

      game.blue_side_team_id = blue_team.id
      game.red_side_team_id = red_team.id
    end
  end
end
