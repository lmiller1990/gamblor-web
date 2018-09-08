require 'rails_helper'

RSpec.describe Player, type: :model do
  let!(:tsm) { create(:team, name: 'tsm') }
  let!(:c9) { create(:team, name: 'c9') }
  let!(:position) { create(:position) }
  let!(:player) { create(:player, position: position) }
  let!(:old_contract) { 
    create(:contract, player: player, team: tsm, start: 1.year.ago) }

  let!(:new_contract) { 
    create(:contract, player: player, team: c9, start: 1.day.ago) }

  describe '#current_team' do
    it { expect(player.current_team).to eq c9 }
  end
end
