# frozen_string_literal: true

require "carrierwave/storage/abstract"
require "carrierwave/storage/file"
require "carrierwave/storage/fog"

CarrierWave.configure do |config|
  if Rails.env.production?
    config.storage = :fog
    config.fog_provider = "fog/aws"
    config.fog_directory = ENV["S3_BUCKET"]
    config.fog_public = false
    config.fog_credentials = {
      provider: "AWS",
      aws_access_key_id: ENV["S3_ACCESS_KEY"],
      aws_secret_access_key: ENV["S3_SECRET_KEY"],
      region: "ap-northeast-1",
      path_style: true
    }
  else
    config.asset_host = "http://localhost"
    config.storage :file
    config.cache_storage = :file
    config.enable_processing = false if Rails.env.test?
  end
end
