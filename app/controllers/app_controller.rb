class AppController < ApplicationController
  def index
    if user_signed_in?
      # just render the app
    else
      redirect_to new_user_session_path
    end
  end
end
