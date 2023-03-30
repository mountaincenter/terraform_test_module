# frozen_string_literal: true

require "rails_helper"

RSpec.describe Post, type: :model do
  let(:user) { FactoryBot.create(:user) }

  it "has a valid factory" do
    expect(FactoryBot.create(:post, user:)).to be_valid
  end

  it "is invalid without content" do
    post = FactoryBot.build(:post, content: nil, user:)
    expect(post).to be_invalid
  end

  it "is invalid with too long content" do
    post = FactoryBot.build(:post, content: "a" * 141, user:)
    expect(post).to be_invalid
  end

  it "belongs to a user" do
    assoc = described_class.reflect_on_association(:user)
    expect(assoc.macro).to eq :belongs_to
  end

  it "can have images" do
    post = FactoryBot.create(:post, images: [fixture_file_upload("spec/fixtures/sample.png", "image/png")], user:)
    expect(post.images.count).to eq 1
  end
end
