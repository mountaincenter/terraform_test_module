module Api
  module V1
    module Auth
      class SessionsController < ApplicationController

        def index
          if current_api_v1_user
            render json: current_api_v1_user, serializer: UserSerializer, status: :ok
          else
            render json: { status: 500, message: "ユーザーが存在しません" }
          end
        end

        def render_create_success
          render json: @resource, serializer: UserSerializer, status: 200
        end

        def guest_sign_in
          @resource = User.guest
          @token = @resource.create_new_auth_token
          @resource.save!
          render_create_success
        end

      end
    end
  end
end