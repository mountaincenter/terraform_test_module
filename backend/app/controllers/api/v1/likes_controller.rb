
module Api
  module V1
    class LikesController < ApplicationController
      before_action :authenticate_user!
      before_action :set_post, only: %i[create destroy]

      def create
        @like = current_api_v1_user.likes.build(post: @post)
        if @like.save
          render json: { status: 200, like: @like }
        else
          render json: { status: 500, errors: @like.errors.full_messages }
        end
      end

      def destroy
        @like = current_api_v1_user.likes.find_by(post: @post)
        if @like.destroy
          render json: { status: 200, like: @like }
        else
          render json: { status: 500, errors: @like.errors.full_messages }
        end
      end

      private

      def set_post
        @post = Post.find(params[:post_id])
      end

      def authenticate_user!
        render json: { status: 401, errors: ['Unauthorized'] } unless current_api_v1_user
      end
    end
  end
end
