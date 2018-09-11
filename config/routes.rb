Rails.application.routes.draw do
  get '/', to: 'join#index'
  get 'app', to: 'app#index'
  get 'admin', to: 'admin#index'

  resources :games
  resources :contracts
  resources :players
  resources :teams do
    resources :games, only: [:index], controller: 'teams/games'
  end

  namespace :api do
    namespace :v1 do
      resources :teams, only: [:show, :index] do
        resources :first_markets, only: [:index, :show], controller: 'teams/first_markets'
      end
      resources :games, only: [:show, :index, :create, :update]
    end
  end
end
