class AppController < ApplicationController
  def index
    if user_signed_in?
      @settings = {
        defaultSplitId: default_split_id,
        admin: current_user.admin?
      }.to_json
    else
      redirect_to new_user_session_path
    end
  end

  private 

  def default_split_id
    split = Split.find_by_name(EasySettings['default_split'])
    split ? split.id : nil
  end
end

