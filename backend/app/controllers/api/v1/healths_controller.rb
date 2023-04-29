module Api
  module V1
    #
    # HealthsController
    #
    class HealthsController < ApplicationController
      before_action :authenticate_api_v1_user!

      def index
        healths = Health.where(user_id: current_api_v1_user.id).order(date: :asc)
        render json: healths, each_serializer: HealthSerializer, scope: current_api_v1_user, status: 200
      end


      def create
        @health = Health.new(health_params.merge(user: current_api_v1_user))
        if @health.save
          render json: @health, status: :created
        else
          render json: { errors: @health.errors.full_messages }, status: :unprocessable_entity
        end
      end
      private

      def health_params
        params.permit(:weight, :body_fat_percent, :date)
      end
    end


  end
end
