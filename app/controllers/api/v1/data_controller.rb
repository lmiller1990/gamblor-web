module Api
  module V1
    class DataController < ::ActionController::API
      def index
        render plain: GameDataCsvService.new.call
      end
    end
  end
end
