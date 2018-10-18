class AppController < ApplicationController
  def index
    if user_signed_in?
      @settings = {
        defaultSplit: EasySettings['default_split'],
        admin: current_user.admin?
      }.to_json
    else
      redirect_to new_user_session_path
    end
  end
end
