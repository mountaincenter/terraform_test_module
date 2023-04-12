module Api
  module V1
    #
    # Users Controller
    #
    class UsersController < ApplicationController
      before_action :authenticate_api_v1_user!
      before_action :set_user, only: %i[show update]

      def index
        users = User.where.not(id: current_api_v1_user.id)
        render json: users, each_serializer: UserSerializer, scope: current_api_v1_user, status:200
      end

      def show
        @user = User.find(params[:id])
        render json: @user, each_serializer: UserSerializer, scope: current_api_v1_user, status: 200
      end

      def update
        @user.name = user_params[:name]
        @user.profile = user_params[:profile]
        if @user.save
          render json: @user, each_serializer: UserSerializer, scope: current_api_v1_user, status: 200
        else
          render json: { status: 500, message: '更新に失敗しました' }
        end
      end

      private

      def set_user
        @user = User.find(params[:id])
      end

      def user_params
        params.permit(:name, :profile)
      end
    end
  end
end
