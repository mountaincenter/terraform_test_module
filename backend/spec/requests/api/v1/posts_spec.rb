# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::Posts', type: :request do
  include Devise::Test::IntegrationHelpers

  let!(:user) { create(:user) }
  let!(:posts) { create_list(:post, 20, user: user) }
  let(:post_id) { posts.first.id }
  let(:headers) do
    user = create(:user)
    sign_in user
    headers = {}
    headers["access-token"] = response.header["access-token"]
    headers["client"] = response.header["client"]
    headers["uid"] = response.header["uid"]
    headers
  end

  describe 'GET /index' do
    before { get '/api/v1/posts', params: {}, headers: @headers }

    it 'returns posts' do
      expect(json).not_to be_empty
      expect(json.size).to eq(20)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  describe 'GET /show' do
    before { get "/api/v1/posts/#{post_id}", params: {}, headers: @headers }

    context 'when the record exists' do
      it 'returns the post' do
        expect(json).not_to be_empty
        expect(json['id']).to eq(post_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the record does not exist' do
      let(:post_id) { 100 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Post/)
      end
    end
  end

  describe 'POST /create' do
    let(:valid_attributes) { { content: 'This is a test post.', user_id: user.id } }

    context 'when the request is valid' do
      before { post '/api/v1/posts', params: valid_attributes.to_json, headers: @headers }

      it 'creates a post' do
        expect(json['content']).to eq('This is a test post.')
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      before { post '/api/v1/posts', params: { content: ' ' }.to_json, headers: @headers }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body).to match(/Validation failed: Content can't be blank/)
      end
    end
  end

  describe 'DELETE /destroy' do
    before { delete "/api/v1/posts/#{post_id}", params: {}, headers: @headers }

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end
end