module Api
  module V1
    class SplitsController < ::ActionController::API
      def show
        render json: Split.find(splits_params[:id]).as_json(methods: [:games])
      end

      private

      def splits_params
        params.permit(:id)
      end
    end
  end
end
