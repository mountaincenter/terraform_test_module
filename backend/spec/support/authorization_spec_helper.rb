# frozen_string_literal: true

#
# This module is used to generate the headers needed to make requests to the API
#
module AuthorizationSpecHelper
  def authorized_user_headers
    user = create(:user)
    post api_v1_user_session_url, params: { email: user.email, password: "password" }
    headers = {}
    headers["access-token"] = response.header["access-token"]
    headers["client"] = response.header["client"]
    headers["uid"] = response.header["uid"]
    headers
  end
end
