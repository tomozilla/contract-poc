class Contract < ApplicationRecord
  belongs_to :company, optional: true

  STATUSES = {
    draft:               0,
    ready_for_signature: 1,
    signed:              2
  }.freeze

  # pass the attribute name and mapping as two positional args:
  enum :status, STATUSES

  validates :title, presence: true
  validates :content, presence: true
end
