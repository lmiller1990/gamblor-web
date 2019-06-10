class AppController < ApplicationController
  def index
    if user_signed_in?
      # just render the app
    else
      # app is now free to use without an account!
      # redirect_to new_user_session_path
    end
  end
end
