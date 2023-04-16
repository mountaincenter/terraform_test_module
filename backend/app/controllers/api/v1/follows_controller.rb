# frozen_string_literal: true

module Api
  module V1
    #
    # FollowsController
    #
    class FollowsController < ApplicationController
      before_action :authenticate_user!
      before_action :set_user, only: %i[create destroy]
      before_action :set_follow, only: [:destroy]

      def create
        follow = current_api_v1_user.following_relationships.build(followed_id: @user.id)

        if follow.save
          render json: follow, status: :created
        else
          render json: { errors: follow.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @follow.destroy
        head :no_content
      end

      private

      def set_user
        @user = User.find(params[:user_id])
      end

      def set_follow
        @follow = current_api_v1_user.following_relationships.find_by(followed_id: @user.id)
        head :not_found unless @follow
      end

      def authenticate_user!
        render json: { status: 401, errors: ["Unauthorized"] } unless current_api_v1_user
      end
    end
  end
end
