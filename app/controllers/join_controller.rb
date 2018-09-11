class JoinController < ApplicationController
  def index
    @subscriber = Subscriber.new
    render layout: 'join'
  end
end
