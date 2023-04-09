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
        render json: { status: 200, users: users }
      end

      def show
        @user = User.find(params[:id])
        render json: { status: 200, user: @user }
      end

      def update
        @uesr.name = user_params[:name]
        if @user.save
          render json: { status: 200, user: @user }
        else
          render json: { status: 500, message: '更新に失敗しました' }
        end
      end

      private

      def set_user
        @user = User.find(params[:id])
      end

      def user_params
        params.permit(:name)
      end
    end
  end
end

class Api::V1::UsersController < ApplicationController
end
