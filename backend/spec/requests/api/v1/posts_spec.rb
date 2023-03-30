# frozen_string_literal: true

describe "POST api/v1/posts#create" do
  let(:authorized_headers) do
    authorized_user_headers
  end
  let(:new_post) do
    attributes_for(:post, content: "create_contentテスト")
  end
  it "正常レスポンスコードが返ってくる" do
    post api_v1_posts_url, params: new_post, headers: authorized_headers
    expect(response.status).to eq 200
  end
  it "1件増えて返ってくる" do
    expect do
      post api_v1_posts_url, params: new_post, headers: authorized_headers
    end.to change { Post.count }.by(1)
  end
  it "contentが正しく返ってくる" do
    post api_v1_posts_url, params: new_post, headers: authorized_headers
    json = JSON.parse(response.body)
    expect(json["post"]["content"]).to eq("create_contentテスト")
  end
  it "不正パラメータの時にerrorsが返ってくる" do
    post api_v1_posts_url, params: {}, headers: authorized_headers
    json = JSON.parse(response.body)
    expect(json.key?("errors")).to be true
  end
end
