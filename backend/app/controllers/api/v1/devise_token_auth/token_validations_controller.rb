class Api::V1::DeviseTokenAuth::TokenValidationsController < ApplicationController
  def validate_token
    # リクエストヘッダーから認証トークンを取得
    auth_token = request.headers['access-token']
    client_id = request.headers['client']
    uid = request.headers['uid']

    # トークンの有効性を検証
    @resource = User.find_by(uid: uid)

    if @resource && @resource.valid_token?(auth_token, client_id)
      render json: @resource, serializer: UserSerializer
    else
      render json: { errors: ['認証に失敗しました'] }, status: :unauthorized
    end
  end

end
