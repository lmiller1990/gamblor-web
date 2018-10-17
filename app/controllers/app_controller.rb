class AppController < ApplicationController
  def index
    @settings = {
      defaultSplit: EasySettings['default_split']
    }.to_json
  end
end
