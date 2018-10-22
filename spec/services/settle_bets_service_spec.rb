require 'rails_helper'

describe SettleBetsService do
  let!(:blue_side_team) { create(:blue_side_team) }
  let!(:red_side_team) { create(:red_side_team) }
  let!(:game) { 
    create(:game, 
           first_turret_team_id: red_side_team.id,
           red_side_team_id: red_side_team.id,
           blue_side_team_id: blue_side_team.id
          ) }

  let!(:bet) { 
    create(:bet, game: game, team_bet_on_id: game.red_side_team_id) }


  it 'settles all bets for a game' do
    described_class.new(game).call

    bet.reload

    expect(bet.payout_cents).to eq(bet.odds * bet.price_cents)
  end
end
