# frozen_string_literal: true

module Api
  module V1
    module Auth
      #
      # ログイン状態確認
      #
      class SessionsController < ApplicationController
        def index
          if current_api_v1_user
            render json: { status: 200, current_user: current_api_v1_user }
          else
            render json: { status: 500, message: "ユーザーが存在しません" }
          end
        end

        def guest_sign_in
          @resource = User.guest
          @token = @resource.create_token
          @resource.save!
          render_create_success
        end

      end
    end
  end
end
