Rails.application.routes.draw do
  devise_for :users
  get '/', to: 'join#index'
  resources :subscribers, only: [:create, :index]

  authenticated do
    get 'app', to: 'app#index'
    get 'admin', to: 'admin#index'

    resources :games
    resources :contracts
    resources :players
    resources :articles

    resources :teams do
      resources :games, only: [:index], controller: 'teams/games'
    end

    namespace :api do
      namespace :v1 do
        resources :upcoming_games, only: [:index]
        resources :teams, only: [:show, :index] do
          resources :first_markets, only: [:index, :show], controller: 'teams/first_markets'
        end
        resources :games, only: [:show, :index, :create, :update]
      end
    end
  end
end
