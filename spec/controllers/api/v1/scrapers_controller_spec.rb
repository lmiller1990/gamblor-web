require 'rails_helper'

describe Api::V1::ScrapersController, type: :controller do
  describe 'create' do
    it 'calls a bookkeeper crawler service and returns when complete' do
      expect(BookkeeperOddsCrawlerService).to receive(:scrape_bet365).and_return true

      post :create, params: { bookie: 'bet365' }

      expect(json_response['success']).to be true
    end
  end

  describe 'index' do
    it 'read odds from file using params' do
      expect(BookkeeperOddsReaderService).to receive(:call).with(%w(fb ft), %w(node odds), 'bet365')

      post :index, params: {
        bookie: 'bet365',
        markets: 'fb,ft'
      }
    end
  end
end
