module Api
  module V1
    class SimulationController < ::ActionController::API
      def index
        markets = params[:markets].split(',')
        min_ev = params[:min_ev].to_f
        min_diff = params[:min_diff].to_f / 100

        if markets.count == 0
          return {
            recommendations: []
          }
        end

        train = Game.where('date > ? and date < ?', Date.new(2019, 1, 1), Date.new(2019, 5, 1)).where(split_id: 4)
        test = Game.where('date > ? and date < ?', Date.new(2019, 5, 30), Date.new(2020, 6, 4)).where.not(winner_id: nil)

        recommendations = []
        options = { :min_ev => min_ev, :min_success_percentage_diff => min_diff } 

        markets.each do |market|
          recommendations += RecommendationsService.new(
            train,
            test, 
            market,
            options
          ).call
        end

        simulation = SimulationService.new(
          recommendations,
          { initial_bankroll: 200, bet_amount: 30 }
        ).call

        render json: { 
          recommendations: recommendations,
          simulation: simulation
        }
      end
    end
  end
end
