# frozen_string_literal: true

#
# Post Controller
#
module Api
  module V1
    #
    # Post Controller
    #
    class PostsController < ApplicationController
      # before_action :authenticate_api_v1_user!
      before_action :set_post, only: %i[show destroy]

      def index
        if params[:query].present?
          posts = Post.where('content Like ?', "%#{params[:query]}%")
        else
          posts = Post.includes(:user).order(created_at: :desc).limit(20)
        end
        render json: posts, each_serializer: PostSerializer, scope: current_api_v1_user
      end

      def show
        render json: @post, each_serializer: PostSerializer, scope: current_api_v1_user
      end

      def create
        post = Post.new(post_params)
        if post.save
          render json: post
        else
          render json: { errors: post.errors }
        end
      end

      def destroy
        @post.destroy
        render json: @post
      end

      private

      def set_post
        @post = Post.find(params[:id])
      end

      def post_params
        params.permit(:content, { images: [] }, :user_id)
      end
    end
  end
end
