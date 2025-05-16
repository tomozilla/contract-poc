class Company < ApplicationRecord
  has_many :contracts, dependent: :destroy
end
