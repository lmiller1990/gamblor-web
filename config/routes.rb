Rails.application.routes.draw do
  devise_for :users
  get '/', to: 'join#index'
  resources :subscribers, only: [:create, :index]


  namespace :api do
    namespace :v1 do
      resources :odds, only: %i(create show)
    end
  end
  authenticated do
    get 'app', to: 'app#index'
    get 'admin', to: 'admin#index'

    resources :games do
      resources :duplicate, only: [:create], controller: 'games/duplicate'
    end

    resources :contracts
    resources :players
    resources :articles
    resources :splits

    resources :teams do
      resources :games, only: [:index], controller: 'teams/games'
    end

    namespace :api do
      namespace :v1 do
        resources :upcoming_games, only: [:index]
        resources :odds, only: %i(create show)

        resources :teams, only: [:show, :index] do
          resources :first_markets, only: [:index, :show], controller: 'teams/first_markets'
        end
        resources :games, only: [:show, :index, :create, :update]

        resources :leagues do
          resources :splits, only: %i(index), controller: 'leagues/splits'
        end
      end
    end
  end
end
