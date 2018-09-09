require 'rails_helper'

RSpec.describe Contract, type: :model do
  describe '.ongoing' do

    let!(:blue_side_team) { create(:blue_side_team) }
    let!(:future_end_date) { create(:contract, end_date: DateTime.tomorrow) }
    let!(:no_end_date) { create(:contract, end_date: nil, team: blue_side_team) }

    it 'returns contracts with no end date of future end date' do
      expect(Contract.ongoing).to eq [future_end_date, no_end_date]
    end
  end

  describe '.past' do
    let!(:completed_contract) { create(:contract, :past_date) }

    it 'returns past contracts' do
      expect(Contract.past).to eq [completed_contract]
    end
  end
end
