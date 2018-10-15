require 'rails_helper'

describe BookkeeperOddsReaderService do
  describe '.call' do
    it 'reads odds from a csv for a given bookie' do
      actual = described_class.call(['fb'], %w(spec fixtures odds), 'bet365')

      expect(actual).to eq({
        fb: [
          ['team_1', 'team_2', 'team_1_odds', 'team_2_odds'],
          ['counter logic gaming', 'team solomid', '1.5', '2']
        ]
      })
    end
  end
end

