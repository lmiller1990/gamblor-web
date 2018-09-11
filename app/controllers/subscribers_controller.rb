class SubscribersController < ApplicationController
  def create
    Subscriber.create!(subscriber_params)
  end

  private

  def subscriber_params
    params.require(:subscriber).permit(:name, :email)
  end
end
