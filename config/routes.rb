Rails.application.routes.draw do
  devise_for :users
  get '/', to: 'join#index'
  root 'join#index'
  resources :subscribers, only: [:create, :index]
  resources :users, only: [:index]
  resources :app, only: %i(index)

  authenticated do
    get 'admin', to: 'admin#index'

    get 'admin/odds_scraper', to: 'admin/odds_scraper#index'

    resources :games do
      resources :duplicate, only: [:create], controller: 'games/duplicate'
      put 'switch_side', controller: 'games/switch_side'
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
        delete 'session', to: 'session#destroy'
        resources :data, only: [:index]
        resources :bank_accounts, only: [:index]
        resources :bets
        resources :upcoming_games, only: [:index]
        resources :odds, only: %i(create show)
        resources :scrapers, only: %i(create index)
        resources :splits, only: %i(show)

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
