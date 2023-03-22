class ElbController < ApplicationController
  def health_check
    render json: {result: 'ok'}
  end
end
