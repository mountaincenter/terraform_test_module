module Api
  module V1
    #
    # comments controller
    #
    class CommentsController < ApplicationController
      before_actions :authenticate_api_v1_user!

      def create
        @post = Post.find(params[:post_id])
        @comment = @post.comments.new(comment_params)
        @comment.user = current_api_v1_user

        if @comment.save
          render json: @comment, status: :created
        else
          render josn: @comment.errors, status: :unprocessable_entity
        end
      end

      private

      def comment_params
        params.premit(:body)
      end

    end
  end
end
