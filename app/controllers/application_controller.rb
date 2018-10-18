require 'pry'
class ApplicationController < ActionController::Base
  include Pundit

  protected

  def after_sign_in_path_for(resource)
    app_index_path
  end
end
