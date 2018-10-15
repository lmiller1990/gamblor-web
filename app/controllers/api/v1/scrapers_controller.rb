module Api
  module V1
    class ScrapersController < ::ActionController::API
      before_action :set_bookie

      def create
        result = BookkeeperOddsCrawlerService.send("scrape_#{@bookie}".to_sym)
        render json: { success: result }
      end

      def index
        markets = scraper_params[:markets].split(',')
        result = BookkeeperOddsReaderService.call(markets, %w(node odds), @bookie)
        render json: result
      end

      private

      def scraper_params
        params.permit(:bookie, :markets)
      end

      def set_bookie
        @bookie = scraper_params[:bookie]
      end
    end
  end
end
