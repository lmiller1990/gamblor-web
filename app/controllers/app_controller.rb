class AppController < ApplicationController
  def index
    @settings = {
      defaultSplit: EasySettings['default_split'],
      admin: current_user.admin?
    }.to_json
  end
end
