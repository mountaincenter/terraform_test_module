# frozen_string_literal: true

Rails.application.routes.draw do
  get "/health_check" => "elb#health_check"
  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for "User", at: "auth", controllers: {
        registrations: "api/v1/auth/registrations"
      }

      namespace :auth do
        resources :sessions, only: %i[index]
        # post "sessions/guest_sign_in", to: "sessions#guest_sign_in"
      end
      resources :posts, only: %i[index create destroy show] do
        resource :likes, only: %i[create destroy]
      end
      devise_scope :api_v1_user do
        post "auth/sessions/guest_sign_in", to: "auth/sessions#guest_sign_in"
      end
      resources :users, only: %i[] do
        resource :follows, only: %i[create destroy]
      end
    end
  end
end
