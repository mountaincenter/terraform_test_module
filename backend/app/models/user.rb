# frozen_string_literal: true

#
# ユーザー
#
class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  validates :name, presence: true, length: { maximum: 30 }
  validates :email, presence: true, length: { maximum: 100 }

  has_many :posts, dependent: :destroy
  has_many :likes, dependent: :destroy

  has_many :follower_relationships, class_name: "Follow", foreign_key: "followed_id", dependent: :destroy
  has_many :followers, through: :follower_relationships, source: :follower

  has_many :following_relationships, class_name: "Follow", foreign_key: "follower_id", dependent: :destroy
  has_many :following, through: :following_relationships, source: :followed

  def self.guest
    find_or_create_by!(
      email: "guest@example.com",
      uid: "guest@example.com",
      provider: "email",
      name: "ゲストユーザー"
    ) do |user|
      user.password = SecureRandom.urlsafe_base64
    end
  end
end
