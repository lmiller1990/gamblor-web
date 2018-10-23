require 'rails_helper'

describe SettleBetsService do
  let!(:user) { create(:user) }
  let!(:blue_side_team) { create(:blue_side_team) }
  let!(:red_side_team) { create(:red_side_team) }
  let!(:game) { 
    create(:game, 
           first_turret_team_id: red_side_team.id,
           red_side_team_id: red_side_team.id,
           blue_side_team_id: blue_side_team.id
          ) }

  let!(:won_bet) { 
    create(:bet, game: game, team_bet_on_id: game.red_side_team_id, user: user) }
  let!(:lost_bet) { 
    create(:bet, game: game, team_bet_on_id: game.blue_side_team_id, user: user) }



  it 'settles all bets for a game' do
    described_class.new(game).call

    won_bet.reload
    lost_bet.reload

    expect(won_bet.payout_cents).to eq(won_bet.odds * won_bet.price_cents)
    expect(lost_bet.payout_cents).to eq(0)
  end
end
