require 'rails_helper'

RSpec.describe Split, type: :model do
  describe 'a valid split' do
    it 'is valid' do
      split = create(:split)

      expect(split.valid?).to be true
    end

    it 'disallows nil league' do
      split = build(:split, league_id: nil)

      expect(split.valid?).to be false
    end

    it 'disallows nil start date' do
      split = build(:split, start_date: nil)

      expect(split.valid?).to be false
    end

    it 'disallows nil end date' do
      split = build(:split, end_date: nil)

      expect(split.valid?).to be false
    end
  end
end
