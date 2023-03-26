# frozen_string_literal: true

#
# Default from address
#
class ApplicationMailer < ActionMailer::Base
  default from: "from@example.com"
  layout "mailer"
end
