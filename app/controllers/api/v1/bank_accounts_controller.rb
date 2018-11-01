module Api
  module V1
    class BankAccountsController < ::ActionController::API
      def index
        render json: current_user.bank_account
      end
    end
  end
end
