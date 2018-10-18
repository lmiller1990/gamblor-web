require 'rails_helper'

RSpec.describe Bet, type: :model do
  it 'is valid' do
    expect(build(:bet)).to be_valid
  end

  it 'is not valid' do
    invalid_bet = build(:bet, user: nil, game: nil, market: nil)

    expect(invalid_bet).not_to be_valid
  end
end
