# frozen_string_literal: true

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins ["localhost:3000", "https://web.ymnk.fun"]

    resource "*",
             headers: :any,
             expose: %i[access-token client expiry token-type uid],
             methods: %i[get post put patch delete options head]
  end
end
