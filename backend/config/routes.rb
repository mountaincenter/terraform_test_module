# frozen_string_literal: true

Rails.application.routes.draw do
  get "/health_check" => "elb#health_check"
  namespace :api do
    namespace :v1 do
      resources :todos, only: %i[index create destroy]
    end
  end
end
