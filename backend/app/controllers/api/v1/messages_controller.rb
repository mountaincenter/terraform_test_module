module Api
  module V1
    class MessagesController < ApplicationController
      before_action :authenticate_api_v1_user!
      before_action :set_recipient, only: %i[index create]

      def index
        messages = Message.between_users(current_api_v1_user, User.find(params[:user_id])).order(created_at: :desc)
        render json: messages, status: :ok
      end

      def create
        message = current_api_v1_user.sent_messages.build(message_params)
        message.recipient_id = @recipient.id

        if message.save
          render json: message, status: :created
        else
          render json: { error: message.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def message_params
        params.require(:message).permit(:body)
      end

      def set_recipient
        @recipient = User.find(params[:user_id])
      end
    end
  end
end
