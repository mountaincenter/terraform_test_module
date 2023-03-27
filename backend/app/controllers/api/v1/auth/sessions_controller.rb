# frozen_string_literal: true

#
# ログイン状態確認
#
class Api::V1::Auth::SessionsController < ApplicationController
  def index
    if current_api_v1_user
      render json: { status: 200, current_user: current_api_v1_user }
    else
      render json: { status: 500, message: "ユーザーが存在しません" }
    end
  end
end