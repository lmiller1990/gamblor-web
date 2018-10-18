module Api
  module V1
    class SessionController < ::ActionController::API
      def destroy
        sign_out current_user

        render json: { status: 200 }
      end
    end
  end
end
