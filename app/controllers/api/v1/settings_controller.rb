module Api
  module V1
    class SettingsController < ActionController::API 
      def index
        settings = {
          defaultSplitId: default_split_id,
          admin: current_user.admin?
        }.to_json

        render json: settings
      end

      private 

      def default_split_id
        split = Split.find_by_name(EasySettings['default_split'])
        split ? split.id : nil
      end
    end
  end
end