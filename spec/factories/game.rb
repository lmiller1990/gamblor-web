FactoryBot.define do
  factory :game do
    association :league
    association :split

    date 100.years.ago
    winner_id 1  
    loser_id 1
    blue_side_team_id 1
    red_side_team_id 2
    game_number 1
  end

  trait :with_teams do
    after :create do |game|
      blue_team = create(:blue_side_team)
      red_team = create(:red_side_team)

      game.blue_side_team_id = blue_team.id
      game.red_side_team_id = red_team.id
    end
  end

  trait :with_stats do
    after :create do |game|
      game.blue_side_team_fb_odds = 1.5
      game.blue_side_team_fd_odds = 1.5
      game.blue_side_team_ft_odds = 1.5
      game.blue_side_team_fbaron_odds = 1.5
      game.blue_side_team_win_odds = 1.5

      game.red_side_team_fb_odds = 2.5
      game.red_side_team_fd_odds = 2.5
      game.red_side_team_ft_odds = 2.5
      game.red_side_team_fbaron_odds = 2.5
      game.red_side_team_win_odds = 2.5

      game.first_blood_team_id = game.blue_side_team.id
      game.first_turret_team_id = game.blue_side_team.id
      game.first_dragon_team_id = game.blue_side_team.id
      game.first_baron_team_id = game.blue_side_team.id

      game.winner_id = game.red_side_team.id
      game.loser_id = game.blue_side_team.id

      game.save!
    end
  end
end
