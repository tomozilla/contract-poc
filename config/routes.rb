require "sidekiq/web"

Rails.application.routes.draw do
  resources :documents, only: [ :new, :create, :show ]
  get "/privacy", to: "home#privacy"
  get "/terms", to: "home#terms"
authenticate :user, lambda { |u| u.admin? } do
  mount Sidekiq::Web => "/sidekiq"

  namespace :madmin do
    resources :impersonates do
      post :impersonate, on: :member
      post :stop_impersonating, on: :collection
    end
  end
end

  resources :notifications, only: [ :index ]
  resources :announcements, only: [ :index ]
  resources :html_signatures, only: [ :new, :create ] do
    get "sign", on: :collection
  end
  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }
  root to: "home#index"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  # root "posts#index"
end
