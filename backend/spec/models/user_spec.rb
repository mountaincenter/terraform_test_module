# frozen_string_literal: true

require "rails_helper"

RSpec.describe User, type: :model do
  describe "name" do
    context "blankの時に" do
      let(:user) do
        build(:user, name: "")
      end
      it "invalidになること" do
        expect(user).to_not be_valid
      end
    end
    context "max_lengthを超える時に" do
      context "30文字の時に" do
        let(:user) do
          build(:user, name: "あ" * 30)
        end
        it "validになること" do
          expect(user).to be_valid
        end
      end
      context "31文字の時に" do
        let(:user) do
          build(:user, name: "あ" * 31)
        end
        it "invalidになること" do
          expect(user).to_not be_valid
        end
      end
    end
  end

  describe "email" do
    context "blankの時に" do
      let(:user) do
        build(:user, email: "")
      end
      it "invalidになること" do
        expect(user).to_not be_valid
      end
    end
    context "max_lengthを超える時に" do
      context "100文字の時に" do
        let(:user) do
          build(:user, email: "@example.com".rjust(100, "a"))
        end
        it "validになること" do
          expect(user).to be_valid
        end
      end
      context "101文字の時に" do
        let(:user) do
          build(:user, email: "@example.com".rjust(101, "a"))
        end
        it "invalidになること" do
          expect(user).to_not be_valid
        end
      end
    end
    context "emailのフォーマットにより" do
      context "validなemailの時に" do
        let(:user) do
          build(:user, email: "test@example.com")
        end
        it "validになること" do
          expect(user).to be_valid
        end
      end
      context "invalidなemailの時に" do
        let(:user) do
          build(:user, email: "invalid_email")
        end
        it "invalidになること" do
          expect(user).to_not be_valid
        end
      end
    end
  end
end
