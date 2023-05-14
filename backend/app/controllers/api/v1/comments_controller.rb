module Api
  module V1
    #
    # comments controller
    #
    class CommentsController < ApplicationController
      # before_action :authenticate_api_v1_user!

      def index
        @comments = Comment.where(post_id: params[:post_id])
        render json: @comments, status: :ok
      end

      def create
        @post = Post.find(params[:post_id])
        @comment = Comment.new(comment_params.merge(post: @post, user: current_api_v1_user))

        if @comment.save
          render json: @comment, status: :created
        else
          render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def comment_params
        params.permit(:body)
      end

    end
  end
end
