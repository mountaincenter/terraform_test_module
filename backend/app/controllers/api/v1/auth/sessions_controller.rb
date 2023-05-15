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

        def guest_sign_in
          user = User.guest
          tokens = user.create_new_auth_token
          response.headers['access-token'] = tokens['access-token']
          response.headers['client'] = tokens['client']
          response.headers['uid'] = tokens['uid']

          render json: {
            status: 200,
            user: user,
            access_token: tokens['access-token'],
            client: tokens['client'],
            uid: tokens['uid']
          }
        end

      end
    end
  end
end