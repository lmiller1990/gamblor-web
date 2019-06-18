module Api
  module V1
    class SimulationController < ::ActionController::API
      def index
        train = Game.where('date > ? and date < ?', Date.new(2019, 1, 1), Date.new(2019, 5, 1)).where(split_id: 4)
        test = Game.where('date > ? and date < ?', Date.new(2019, 5, 30), Date.new(2020, 6, 4)).where.not(winner_id: nil)

        markets = ['fb'] #, 'ft', 'fd', 'fbaron']
        recommendations = []
        options = { :min_ev => 1.0, :min_success_percentage_diff => 0.2 } 

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
