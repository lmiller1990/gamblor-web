class TeamsController < ApplicationController
  def index
    @teams = Team.all
  end

  def show
  end
end
