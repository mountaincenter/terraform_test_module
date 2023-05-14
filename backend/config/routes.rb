# frozen_string_literal: true

Rails.application.routes.draw do
  get "/health_check" => "elb#health_check"
  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for "User", at: "auth", controllers: {
        registrations: "api/v1/auth/registrations",
      }

      namespace :auth do
        resources :sessions, only: %i[index]
        get 'validate_token', to: 'token_validations#validate_token'
      end
      resources :posts, only: %i[index create destroy show] do
        resource :likes, only: %i[create destroy]
        resources :comments, only: %i[index create]
      end
      resources :users, only: %i[index show update] do
        resource :follows, only: %i[create destroy]
        resources :messages, only: %i[index create]
        resources :healths, only: %i[index create]
      end
    end
  end
end
